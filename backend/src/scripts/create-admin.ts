import dotenv from 'dotenv';

import { DbUser } from '@alehuo/clubhouse-shared';
import bcrypt from 'bcrypt';
import moment from 'moment';
import UserDao from '../dao/UserDao';
import { dtFormat } from '../utils/DtFormat';
dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'abcd1234';

const createAdminUser = async (email: string, password: string) => {
    console.log('Creating admin user ' + adminEmail);
    const user: DbUser = {
        userId: -1,
        email,
        firstName: 'Admin',
        lastName: 'Admin',
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        permissions: 524287,
        created_at: moment().format(dtFormat),
        updated_at: moment().format(dtFormat),
    };
    await UserDao.save(user);
    console.log('Created admin user ' + adminEmail + '::' + adminPassword);
};

createAdminUser(adminEmail, adminPassword).then(() => process.exit(0));
