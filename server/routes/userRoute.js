import { Router } from 'express';
import verify from '../controllers/verifyToken';
import UserController from '../controllers/userController';
import validateLogin from '../helper/validateLogin'

const usersRouter = Router();

usersRouter.get('/users', verify.verifyToken, UserController.getAllUsers);
usersRouter.post('/signup', UserController.addNewUser);
usersRouter.post('/login', validateLogin.login, UserController.login);

export default usersRouter;
