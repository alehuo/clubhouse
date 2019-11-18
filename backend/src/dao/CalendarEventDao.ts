import { CalendarEvent } from '@alehuo/clubhouse-shared';
import moment from 'moment';
import knex from '../Database';
import { dtFormat } from '../utils/DtFormat';
import Dao from './Dao';

const TABLE_NAME = 'calendarEvents';

class CalendarEventDao implements Dao<CalendarEvent> {
    public findAll(): PromiseLike<CalendarEvent[]> {
        return Promise.resolve(
            knex
                .select()
                .from<CalendarEvent>(TABLE_NAME)
                .orderBy('eventId', 'ASC'),
        );
    }

    public findOne(eventId: number): Promise<CalendarEvent | undefined> {
        return Promise.resolve(
            knex(TABLE_NAME)
                .select<CalendarEvent>()
                .where('eventId', eventId)
                .first(),
        );
    }

    public findCalendarEventsByUser(userId: number): PromiseLike<CalendarEvent[]> {
        return Promise.resolve(
            knex
                .select()
                .from<CalendarEvent>(TABLE_NAME)
                .where('addedBy', userId),
        );
    }

    public save(calendarEvent: CalendarEvent): PromiseLike<number[]> {
        if (calendarEvent.eventId) {
            delete calendarEvent.eventId;
        }
        calendarEvent.created_at = moment().format(dtFormat);
        calendarEvent.updated_at = moment().format(dtFormat);
        return Promise.resolve(knex<CalendarEvent>(TABLE_NAME).insert(calendarEvent));
    }

    public remove(eventId: number): PromiseLike<number> {
        return Promise.resolve(
            knex<CalendarEvent>(TABLE_NAME)
                .delete()
                .where({ eventId }),
        );
    }
}

export default new CalendarEventDao();
