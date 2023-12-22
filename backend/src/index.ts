import dotenv from 'dotenv';
import moment from 'moment';

import { server } from './app';
import { logger } from './logger';
import 'moment/locale/fi';
dotenv.config();
moment.locale('fi');

const port = Number(process.env.PORT || 3001);

// Listen
server.listen(port, () => {
    logger.log('info', 'Server running at ::' + port);
});

export default server;
