import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('keys').del();
    await knex('keyTypes').del();
    await knex('newsposts').del();
    await knex('sessions').del();
    await knex('calendarEvents').del();
    await knex('locations').del();
    await knex('users').del();
    await knex('studentUnions').del();
    await knex('documents').del();
}
