import Knex from 'knex';
import * as knexfile from '../knexfile';
import { Environment } from './Environment';

const isEnv = (x?: string): x is Environment => {
    if (x === undefined) {
        return false;
    }
    const tmp = x as Environment;
    if (tmp == 'development') {
        return true;
    }
    if (tmp == 'production') {
        return true;
    }
    if (tmp == 'test') {
        return true;
    }
    return false;
};

const environment = process.env.NODE_ENV;
if (!isEnv(environment)) {
    throw new Error('NODE_ENV is invalid!');
}

// @ts-ignore
const knexConfig = knexfile[environment];
export default Knex(knexConfig);
