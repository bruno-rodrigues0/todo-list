import express from 'express';;
import { router } from './routes';
import 'dotenv';

const server = express();

server.use(express.json());
server.use(router);

export { server };

