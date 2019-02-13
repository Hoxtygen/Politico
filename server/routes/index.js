import { Router } from 'express';
import partiesRouter from './partiesRoute';
import officesRouter from './officesRoute';
import usersRouter from './userRoute';
import votesRouter from './votesRoute';
import registerCandidateRouter from './electionRoute';
import contestantsRouter from './contestantsRoute';

const router = Router();

router.use('/parties', partiesRouter);
router.use('/offices', officesRouter);
router.use('/auth', usersRouter);
router.use('/votes', votesRouter);
router.use('/office', registerCandidateRouter);
router.use('/contestants', contestantsRouter);

export default router;
