import { Statistics, UserStatistics } from '@alehuo/clubhouse-shared';
import knex from '../Database';
import Dao from './Dao';

class StatisticsDao implements Dao<Statistics> {
    public findAll(): PromiseLike<Statistics[]> {
        throw new Error('Not implemented');
    }

    public findStatistics(): PromiseLike<Statistics> {
        return Promise.resolve(
            knex.raw<Statistics>(
                'SELECT (SELECT COUNT(*) from users) AS userCount, ' +
                    '(SELECT COUNT(*) from calendarEvents) AS eventCount, ' +
                    '(SELECT COUNT(*) from newsposts) AS newspostCount, ' +
                    '(SELECT COALESCE(SUM((endTime - startTime) / (1000.0 * 60 * 60)),0)' +
                    ' FROM sessions WHERE endTime is NOT NULL) AS hoursOnWatch, ' +
                    '(SELECT COUNT(messageId) from messages) AS messageCount FROM users LIMIT 1;',
            ),
        );
    }

    public findStatisticsFromUser(userId: number): PromiseLike<UserStatistics> {
        return Promise.resolve(
            knex.raw<UserStatistics>(
                'SELECT (SELECT COUNT(*) from calendarEvents WHERE addedBy = :userId) AS eventCount, ' +
                    '(SELECT COUNT(*) from newsposts WHERE author = :userId) AS newspostCount, ' +
                    '(SELECT COALESCE(SUM((endTime - startTime) / (1000.0 * 60 * 60)),0)' +
                    ' FROM sessions WHERE endTime is NOT NULL AND userId = :userId) AS hoursOnWatch, ' +
                    '(SELECT COUNT(*) FROM sessions WHERE userId = :userId) AS watchCount, ' +
                    '(SELECT COUNT(messageId) from messages WHERE userId = :userId ) AS messageCount FROM users LIMIT 1;',
                { userId },
            ),
        );
    }

    public findOne(statisticsId: number): PromiseLike<Statistics> {
        throw new Error('Not implemented');
    }

    public save(statistics: Statistics): PromiseLike<number[]> {
        throw new Error('Not implemented');
    }

    public remove(locationId: number): PromiseLike<number> {
        throw new Error('Not implemented');
    }
}

export default new StatisticsDao();
