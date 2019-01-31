import { Router } from 'express';
import verify from '../controllers/verifyToken';
import OfficesController from '../controllers/officesController';

const officeRouter = Router();

officeRouter.get('/offices', verify.verifyToken, OfficesController.getAllOffices);
officeRouter.get('/offices/:id', verify.verifyToken, OfficesController.getOneOffice);
officeRouter.post('/offices', verify.verifyToken, OfficesController.addNewOffice);

export default officeRouter;
