import { Router } from 'express';
import UserController from '../controllers/userController';

const usersRouter = Router();

usersRouter.get('/users', UserController.getAllUsers);
usersRouter.post('/signup', UserController.addNewUser);

export default usersRouter;
