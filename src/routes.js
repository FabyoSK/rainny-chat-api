import { Router } from 'express';
import RoomController from './app/controllers/RoomController'

const routes = new Router();

const roomController = new RoomController();

routes.get('/rooms', roomController.index);

export default routes;
