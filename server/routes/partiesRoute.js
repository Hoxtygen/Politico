import { Router } from 'express';
import partiesController from '../controllers/partiesController';

const partiesRouter = Router();
partiesRouter.get('/parties', partiesController.getAllParties);
partiesRouter.get('/parties/:id', partiesController.getOneParty);

export default partiesRouter;
