import { Router } from 'express';
import verify from '../controllers/verifyToken';
import OfficeController from '../controllers/officeController';

const officeRouter = Router();

officeRouter.get('/offices', verify.verifyToken, OfficeController.getAllOffices);
officeRouter.get('/offices/:id', verify.verifyToken, OfficeController.getOneOffice);
officeRouter.post('/offices', verify.verifyToken, OfficeController.addNewOffice);

export default officeRouter;
