import { Router } from 'express';
import verify from '../controllers/verifyToken';
import ContestantsController from '../controllers/contestantsController';

const contestantsRouter = Router();

contestantsRouter.get('/', ContestantsController.getAllContestants);
contestantsRouter.post('/', ContestantsController.addContestant);


export default contestantsRouter;
