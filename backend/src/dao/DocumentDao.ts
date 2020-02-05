import { Document } from '@alehuo/clubhouse-shared';
import knex from '../Database';
import moment from 'moment';
import { dtFormat } from '../utils/DtFormat';
import Dao from './Dao';

const table = 'documents';

class DocumentDao implements Dao<Document> {
    public findAll(): PromiseLike<Document[]> {
        return Promise.resolve(knex<Document>(table).select());
    }

    public findOne(id: number): PromiseLike<Document | undefined> {
        return Promise.resolve(
            knex<Document>(table)
                .select()
                .where({ documentId: id })
                .first(),
        );
    }

    public remove(id: number): PromiseLike<number> {
        throw new Error('Method not implemented.');
    }

    public save(entity: Document): PromiseLike<number[]> {
        if (entity.documentId) {
            delete entity.documentId;
        }
        entity.created_at = moment().format(dtFormat);
        entity.updated_at = moment().format(dtFormat);
        return Promise.resolve(knex<Document>(table).insert(entity));
    }
}

export default new DocumentDao();
