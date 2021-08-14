import { Router } from 'express';
import UserController from '../../app/controllers/UserController';

const routes = new Router();

const userController = new UserController();

routes.post('/users', userController.store);
routes.post('/login', userController.login);
routes.get('/me', userController.session);

export default routes;
