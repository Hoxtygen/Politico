import { Router } from 'express';
import verify from '../controllers/verifyToken';
import ContestantsController from '../controllers/contestantsController';

const contestantsRouter = Router();

contestantsRouter.get('/', ContestantsController.getAllContestants);
contestantsRouter.get('/:office/contestants', ContestantsController.getSingleOfficeContestants);
contestantsRouter.post('/:id/add', verify.verifyLoggedIn, ContestantsController.addContestant);


export default contestantsRouter;
