import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import routes from './routes';
import { createServer } from "http";
import { Server } from "socket.io";

// Uncomment this line to enable database access
// --------
// import './database';
const app = express();

const http = createServer(app); 
const io = new Server(http); 

app.use(express.json());

app.use(routes);

export { http, io };
