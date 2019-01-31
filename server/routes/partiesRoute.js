import { Router } from 'express';
import verify from '../controllers/verifyToken';
import PartiesController from '../controllers/partiesController';

const partiesRouter = Router();
partiesRouter.get('/parties', verify.verifyToken, PartiesController.getAllParties);
partiesRouter.get('/parties/:id', verify.verifyToken, PartiesController.getOneParty);
partiesRouter.delete('/parties/:id', PartiesController.deleteParty);
partiesRouter.post('/parties', verify.verifyToken, PartiesController.addNewParty);
partiesRouter.patch('/parties/:id', verify.verifyToken, PartiesController.editParty);
export default partiesRouter;
