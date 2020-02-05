import { Document } from '@alehuo/clubhouse-shared';
import Knex from 'knex';
import moment from 'moment';
import { dtFormat } from '../../src/utils/DtFormat';

const documents: Document[] = [
    {
        documentId: 1,
        order: 1,
        text: '# Document 1',
        created_at: moment().format(dtFormat),
        updated_at: moment().format(dtFormat),
    },
    {
        documentId: 2,
        order: 2,
        text: '# Document 2',
        created_at: moment().format(dtFormat),
        updated_at: moment().format(dtFormat),
    },
];

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('documents').del();
    // Insert data
    await knex('documents').insert(documents);
}
