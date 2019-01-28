
import politicalOffice from '../database/officeData';

class OfficeController {
  static getAllOffices(req, res) {
    return res.status(200).json({
      status: 200,
      data: politicalOffice,
    });
  }

 
}


export default OfficeController;
