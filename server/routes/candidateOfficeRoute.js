import { Router } from 'express';
import verify from '../controllers/verifyToken';
import RegisterCandidate from '../controllers/candidateOfficeController';

const registerCandidateRouter = Router();

registerCandidateRouter.post('/:id/register', verify.verifyToken, RegisterCandidate.register);

export default registerCandidateRouter;
