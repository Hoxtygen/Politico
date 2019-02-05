import { Router } from 'express';
import verify from '../controllers/verifyToken';
import OfficesController from '../controllers/officesController';

const officeRouter = Router();

officeRouter.get('/', verify.verifyLoggedIn, OfficesController.getAllOffices);
officeRouter.post('/', /* verify.verifyLoggedIn, */ verify.verifyAdmin, OfficesController.addNewOffice);
officeRouter.get('/:id', verify.verifyAdmin, OfficesController.getOneOffice);

export default officeRouter;
