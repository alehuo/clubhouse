import { isDocument, Document } from '@alehuo/clubhouse-shared';
import express from 'express';
import DocumentDao from '../dao/DocumentDao';
import { logger } from '../logger';
import { MessageFactory } from '../utils/MessageFactory';
import { StatusCode } from '../utils/StatusCodes';
import Controller from './Controller';

class DocumentController extends Controller {
    constructor() {
        super();
    }

    public routes(): express.Router {
        this.router.get('', async (req, res) => {
            try {
                const documents = await DocumentDao.findAll();
                if (!documents.every(isDocument)) {
                    return res
                        .status(StatusCode.INTERNAL_SERVER_ERROR)
                        .json(MessageFactory.createModelValidationError('Document'));
                }
                return res.status(StatusCode.OK).json(MessageFactory.createResponse<Document[]>(true, '', documents));
            } catch (err) {
                logger.error(err);
                return res
                    .status(StatusCode.INTERNAL_SERVER_ERROR)
                    .json(MessageFactory.createError('Server error: cannot fetch documents'));
            }
        });

        this.router.post('/swap/:documentId1(\\d+)/:documentId2(\\d+)', async (req, res) => {
            try {
                const documentId1 = Number(req.params.documentId1);
                const documentId2 = Number(req.params.documentId2);
                const document1 = await DocumentDao.findOne(documentId1);
                const document2 = await DocumentDao.findOne(documentId2);

                if (!document || !document) {
                    return res.status(StatusCode.NOT_FOUND).json(MessageFactory.createError('Document not found'));
                }

                if (!isDocument(document1) || !isDocument(document2)) {
                    return res
                        .status(StatusCode.INTERNAL_SERVER_ERROR)
                        .json(MessageFactory.createModelValidationError('Document'));
                }

                const documentOrder1 = document1.order;
                const documentOrder2 = document2.order;

                document1.order = documentOrder2;
                document2.order = documentOrder1;

                const saved1 = await DocumentDao.save(document1);
                const saved2 = await DocumentDao.save(document2);

                if (saved1 && saved2) {
                    return res
                        .status(StatusCode.OK)
                        .json(
                            MessageFactory.createMessage(
                                'Documents with ID #' + documentId1 + ' and #' + documentId2 + ' swapped.',
                            ),
                        );
                } else {
                    return res
                        .status(StatusCode.BAD_REQUEST)
                        .json(MessageFactory.createError('Error swapping documents'));
                }
            } catch (err) {
                logger.error(err);
                return res
                    .status(StatusCode.INTERNAL_SERVER_ERROR)
                    .json(MessageFactory.createError('Error swapping documents', err as Error));
            }
        });

        this.router.get('/:documentId(\\d+)', async (req, res) => {
            const documentId = Number(req.params.documentId);
            try {
                const document = await DocumentDao.findOne(documentId);
                if (!isDocument(document)) {
                    return res
                        .status(StatusCode.INTERNAL_SERVER_ERROR)
                        .json(MessageFactory.createModelValidationError('Document'));
                }
                if (!document) {
                    return res.status(StatusCode.NOT_FOUND).json(MessageFactory.createError('Document not found'));
                }
                return res.status(StatusCode.OK).json(MessageFactory.createResponse<Document>(true, '', document));
            } catch (err) {
                logger.error(err);
                return res
                    .status(StatusCode.INTERNAL_SERVER_ERROR)
                    .json(MessageFactory.createError('Server error: cannot fetch document'));
            }
        });

        return this.router;
    }
}

export default new DocumentController();
