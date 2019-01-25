import { Router } from 'express';
import partiesController from '../controllers/partiesController';

const partiesRouter = Router();
partiesRouter.get('/parties', partiesController.getAllParties);
partiesRouter.get('/parties/:id', partiesController.getOneParty);
partiesRouter.delete('/parties/:id', partiesController.deleteParty);

export default partiesRouter;
