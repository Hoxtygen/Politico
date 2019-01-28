import { Router } from 'express';
import OfficeController from '../controllers/officeController';

const officeRouter = Router();

officeRouter.get('/offices', OfficeController.getAllOffices);


export default officeRouter;
