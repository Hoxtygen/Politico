import { Router } from 'express';
import partiesController from '../controllers/partiesController';

const partiesRouter = Router();
partiesRouter.get('/parties', partiesController.getAllParties);

export default partiesRouter;
