import dotenv from 'dotenv';
import { createConnection } from 'mysql2/promise';
dotenv.config();

async function createTables() {
    // Create connection
    const con = await createConnection({
        host: String(process.env.MYSQL_HOST),
        port: Number(process.env.MYSQL_POST),
        user: String(process.env.MYSQL_USER),
        password: String(process.env.MYSQL_PASSWORD),
    });

    try {
        // Create databases
        await con.execute(
            'CREATE DATABASE ' +
                process.env.MYSQL_DB_NAME +
                ' DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_unicode_ci',
        );
        await con.execute(
            'CREATE DATABASE ' +
                process.env.MYSQL_DB_NAME +
                '_dev' +
                ' DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_unicode_ci',
        );
        await con.execute(
            'CREATE DATABASE ' +
                process.env.MYSQL_DB_NAME +
                '_test' +
                ' DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_unicode_ci',
        );
        console.log('Created development, test and production databases.');
        process.exit(0);
    } catch (err) {
        console.log('Error: %s', err.message);
        process.exit(0);
    }
}

// Run script
createTables();
