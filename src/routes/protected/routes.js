import { Router } from 'express';
import RoomController from '../../app/controllers/RoomController';

const routes = new Router();

const roomController = new RoomController();

routes.get('/rooms', roomController.index);
routes.post('/rooms', roomController.store);

export default routes;
