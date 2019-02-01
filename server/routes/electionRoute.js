import { Router } from 'express';
import verify from '../controllers/verifyToken';
import RegisterCandidate from '../controllers/electionController';

const registerCandidateRouter = Router();

registerCandidateRouter.post('/:id/register', verify.verifyToken, RegisterCandidate.register);
registerCandidateRouter.get('/:id/result', RegisterCandidate.getResult);

export default registerCandidateRouter;
