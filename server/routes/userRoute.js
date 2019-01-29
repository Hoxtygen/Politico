import { Router } from 'express';
import verify from '../controllers/verifyToken';
import UserController from '../controllers/userController';

const usersRouter = Router();

usersRouter.get('/users', verify.verifyToken, UserController.getAllUsers);
usersRouter.post('/signup', UserController.addNewUser);
usersRouter.post('/login', UserController.login);

export default usersRouter;
