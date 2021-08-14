import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import routes from './routes/public/routes';
import protectedRoutes from './routes/protected/routes';


import './database';

const AuthorizationMiddleware = require('./app/middlewares/AuthorizationMiddleware/AuthorizationMiddleware');

const app = express();

const http = createServer(app);
const io = new Server(http, { cors: true });

app.use(cors());
app.use(express.json());
app.use(express.json());

app.use(routes);
app.use(AuthorizationMiddleware.authorize);
app.use(protectedRoutes);

app.use(async (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json(err);
  }
  return res.status(500).json({ error: 'Internal server error' });
});

export { http, io };
