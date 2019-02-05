import { Router } from 'express';
import verify from '../controllers/verifyToken';
import PartiesController from '../controllers/partiesController';

const partiesRouter = Router();
partiesRouter.post('/', verify.verifyAdmin, PartiesController.addNewParty);
partiesRouter.get('/', verify.verifyLoggedIn, PartiesController.getAllParties);
partiesRouter.get('/:id', verify.verifyLoggedIn, PartiesController.getOneParty);
partiesRouter.delete('/:id', verify.verifyAdmin, PartiesController.deleteParty);
partiesRouter.patch('/:id/name', verify.verifyAdmin, PartiesController.editParty);


export default partiesRouter;
