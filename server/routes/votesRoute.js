import { Router } from 'express';
import verify from '../controllers/verifyToken';
import VoteController from '../controllers/voteController';

const votesRouter = Router();

votesRouter.post('/', /*  verify.verifyToken, */ VoteController.addNewVote);

export default votesRouter;
