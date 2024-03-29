import Controller from './Controller';

import { isMessage, Message } from '@alehuo/clubhouse-shared';
import MessageDao from '../dao/MessageDao';
import UserDao from '../dao/UserDao';
import { logger } from '../logger';
import { JWTMiddleware } from '../middleware/JWTMiddleware';
import { RequestParamMiddleware } from '../middleware/RequestParamMiddleware';
import { sendEmail } from '../utils/Mailer';
import { MessageFactory } from '../utils/MessageFactory';
import { StatusCode } from '../utils/StatusCodes';

class MessageController extends Controller {
    constructor() {
        super();
    }

    public routes() {
        // All messages
        this.router.get('', JWTMiddleware, async (req, res) => {
            try {
                const messages = await MessageDao.findAll();
                if (messages.every(isMessage)) {
                    return res.status(StatusCode.OK).json(MessageFactory.createResponse<Message[]>(true, '', messages));
                } else {
                    return res
                        .status(StatusCode.INTERNAL_SERVER_ERROR)
                        .json(MessageFactory.createModelValidationError('Message'));
                }
            } catch (err) {
                logger.error(err);
                return res
                    .status(StatusCode.INTERNAL_SERVER_ERROR)
                    .json(MessageFactory.createError('Server error: Cannot get all messages', err as Error));
            }
        });
        // A single message
        this.router.get('/:messageId(\\d+)', JWTMiddleware, async (req, res) => {
            try {
                const message = await MessageDao.findOne(Number(req.params.messageId));
                if (message) {
                    if (isMessage(message)) {
                        return res
                            .status(StatusCode.OK)
                            .json(MessageFactory.createResponse<Message>(true, '', message));
                    } else {
                        return res
                            .status(StatusCode.INTERNAL_SERVER_ERROR)
                            .json(MessageFactory.createModelValidationError('Message'));
                    }
                } else {
                    return res.status(404).json(MessageFactory.createError('Message not found'));
                }
            } catch (err) {
                logger.error(err);
                return res
                    .status(StatusCode.INTERNAL_SERVER_ERROR)
                    .json(MessageFactory.createError('Server error: Cannot get a single message', err as Error));
            }
        });
        // Add a message
        this.router.post('', RequestParamMiddleware<Message>('message'), JWTMiddleware, async (req, res) => {
            try {
                const userId: number = res.locals.token.data.userId;

                const msg: Partial<Message> = {
                    created_at: '',
                    messageId: -1,
                    updated_at: '',
                    message: req.body.message,
                    title: req.body.title ? req.body.title : '(No title)',
                    userId,
                };

                if (!isMessage(msg)) {
                    return res
                        .status(StatusCode.INTERNAL_SERVER_ERROR)
                        .json(MessageFactory.createModelValidationError('Message'));
                }

                const savedMessage = await MessageDao.save(msg);

                const user = await UserDao.findOne(userId);

                if (user === undefined) {
                    return res
                        .status(StatusCode.INTERNAL_SERVER_ERROR)
                        .json(MessageFactory.createError('User not found'));
                }

                // TODO: Websocket integration

                const emailTitle = (process.env.MAIL_PREFIX ? '[' + process.env.MAIL_PREFIX + ']: ' : '') + msg.title;

                const message =
                    user.firstName +
                    ' ' +
                    user.lastName +
                    ' has sent the following message: \r\n\r\n\r\n\r\n' +
                    msg.title +
                    '\r\n\r\n' +
                    req.body.message +
                    '\r\n\r\n\r\n\r\nTo view more details, please visit the clubhouse website.';

                // TODO: Fetch email list from userDao
                await sendEmail(['testuser@test.com'], emailTitle, message, '<pre>' + message + '</pre>');

                return res.status(StatusCode.CREATED).json(
                    MessageFactory.createResponse<Message>(true, '', {
                        ...msg,
                        ...{ messageId: savedMessage[0] },
                    }),
                );
            } catch (err) {
                logger.error(err);
                return res
                    .status(StatusCode.INTERNAL_SERVER_ERROR)
                    .json(MessageFactory.createError('Server error: Cannot add a message', err as Error));
            }
        });

        this.router.delete('/:messageId(\\d+)', JWTMiddleware, async (req, res) => {
            try {
                const message = await MessageDao.findOne(Number(req.params.messageId));
                if (message) {
                    if (!isMessage(message)) {
                        return res
                            .status(StatusCode.INTERNAL_SERVER_ERROR)
                            .json(MessageFactory.createModelValidationError('Message'));
                    }
                    const result = await MessageDao.remove(Number(req.params.messageId));
                    if (result) {
                        return res.status(StatusCode.OK).json(MessageFactory.createError('Message removed'));
                    } else {
                        return res
                            .status(StatusCode.BAD_REQUEST)
                            .json(MessageFactory.createError('Failed to remove message'));
                    }
                } else {
                    return res.status(StatusCode.NOT_FOUND).json(MessageFactory.createError('Message not found'));
                }
            } catch (err) {
                logger.error(err);
                return res
                    .status(StatusCode.INTERNAL_SERVER_ERROR)
                    .json(MessageFactory.createError('Server error: Cannot delete a message', err as Error));
            }
        });

        return this.router;
    }
}

export default new MessageController();
