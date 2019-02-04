import { Router } from 'express';
import verify from '../controllers/verifyToken';
import PartiesController from '../controllers/partiesController';

const partiesRouter = Router();
partiesRouter.post('/', /* verify.verifyToken, */ PartiesController.addNewParty);
partiesRouter.get('/', /* verify.verifyToken, */ PartiesController.getAllParties);
partiesRouter.get('/:id', /* verify.verifyToken, */ PartiesController.getOneParty);
partiesRouter.delete('/:id', PartiesController.deleteParty);
partiesRouter.patch('/:id', /* verify.verifyToken, */ PartiesController.editParty);
export default partiesRouter;
