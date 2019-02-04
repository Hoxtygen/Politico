import { Router } from 'express';
import verify from '../controllers/verifyToken';
import OfficesController from '../controllers/officesController';

const officeRouter = Router();

officeRouter.get('/',/*  verify.verifyToken, */ OfficesController.getAllOffices);
officeRouter.post('/',/*  verify.verifyToken, */ OfficesController.addNewOffice);
officeRouter.get('/:id',/*  verify.verifyToken, */ OfficesController.getOneOffice);

export default officeRouter;
