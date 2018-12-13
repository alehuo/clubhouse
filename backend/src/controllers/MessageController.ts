import express from "express";
import Controller from "./Controller";

import { Message } from "@alehuo/clubhouse-shared";
import { isMessage, isNumber } from "@alehuo/clubhouse-shared/dist/Models";
import MessageDao from "../dao/MessageDao";
import UserDao from "../dao/UserDao";
import { JWTMiddleware } from "../middleware/JWTMiddleware";
import { RequestParamMiddleware } from "../middleware/RequestParamMiddleware";
import { sendEmail } from "../utils/Mailer";
import { MessageFactory } from "../utils/MessageFactory";

export default class MessageController extends Controller {
  constructor(private messageDao: MessageDao, private userDao: UserDao) {
    super();
  }

  public routes(): express.Router {
    // All messages
    this.router.get(
      "",
      JWTMiddleware,
      async (req: express.Request, res: express.Response) => {
        try {
          const messages = await this.messageDao.findAll();
          return res.status(200).json(messages);
        } catch (err) {
          return res
            .status(500)
            .json(
              MessageFactory.createError(
                "Internal server error: Cannot get all messages",
                err as Error
              )
            );
        }
      }
    );
    // A single message
    this.router.get(
      "/:messageId(\\d+)",
      JWTMiddleware,
      async (req: express.Request, res: express.Response) => {
        if (!isNumber(req.params.messageId)) {
          return res
            .status(400)
            .json(MessageFactory.createError("Invalid message ID"));
        }
        try {
          const message = await this.messageDao.findOne(req.params.messageId);
          if (message) {
            return res.status(200).json(message);
          } else {
            return res
              .status(404)
              .json(MessageFactory.createError("Message not found"));
          }
        } catch (err) {
          return res
            .status(500)
            .json(
              MessageFactory.createError(
                "Internal server error: Cannot get a single message",
                err as Error
              )
            );
        }
      }
    );
    // Add a message
    this.router.post(
      "",
      RequestParamMiddleware("message"),
      JWTMiddleware,
      async (req: express.Request, res: express.Response) => {
        try {
          const userId: number = res.locals.token.data.userId;

          const title = req.body.title ? String(req.body.title) : "(No title)";

          const msg: Message = {
            created_at: "", // Placeholder
            messageId: -1, // Placeholder
            updated_at: "", // Placeholder
            message: req.body.message,
            title,
            userId
          };

          if (!isMessage(msg)) {
            return res
              .status(400)
              .json(
                MessageFactory.createError(
                  "The request did not contain a valid message."
                )
              );
          }

          const savedMessage = await this.messageDao.save(msg);

          const user = await this.userDao.findOne(userId);

          // TODO: Websocket integration

          const emailTitle =
            (process.env.MAIL_PREFIX
              ? "[" + process.env.MAIL_PREFIX + "]: "
              : "") + title;

          const message =
            user.firstName +
            " " +
            user.lastName +
            " has sent the following message: \r\n\r\n\r\n\r\n" +
            title +
            "\r\n\r\n" +
            req.body.message +
            "\r\n\r\n\r\n\r\nTo view more details, please visit the clubhouse website.";

          // TODO: Fetch email list from userDao
          await sendEmail(
            ["testuser@test.com"],
            emailTitle,
            message,
            "<pre>" + message + "</pre>"
          );

          return res
            .status(201)
            .json({ ...msg, ...{ messageId: savedMessage[0] } });
        } catch (err) {
          return res
            .status(500)
            .json(
              MessageFactory.createError(
                "Internal server error: Cannot add a message",
                err as Error
              )
            );
        }
      }
    );

    this.router.delete(
      "/:messageId(\\d+)",
      JWTMiddleware,
      async (req: express.Request, res: express.Response) => {
        if (!isNumber(req.params.messageId)) {
          return res
            .status(400)
            .json(MessageFactory.createError("Invalid message ID"));
        }
        try {
          const message = await this.messageDao.findOne(req.params.messageId);
          if (message) {
            const result = await this.messageDao.remove(req.params.messageId);
            if (result) {
              return res
                .status(200)
                .json(MessageFactory.createError("Message removed"));
            } else {
              return res
                .status(400)
                .json(MessageFactory.createError("Failed to remove message"));
            }
          } else {
            return res
              .status(404)
              .json(MessageFactory.createError("Message not found"));
          }
        } catch (err) {
          return res
            .status(500)
            .json(
              MessageFactory.createError(
                "Internal server error: Cannot delete a message",
                err as Error
              )
            );
        }
      }
    );

    return this.router;
  }
}
