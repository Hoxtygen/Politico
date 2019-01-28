import { Router } from 'express';
import OfficeController from '../controllers/officeController';

const officeRouter = Router();

officeRouter.get('/offices', OfficeController.getAllOffices);
officeRouter.get('/offices/:id', OfficeController.getOneOffice);
officeRouter.post('/offices', OfficeController.addNewOffice);

export default officeRouter;
