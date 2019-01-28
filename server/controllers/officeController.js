
import politicalOffice from '../database/officeData';

class OfficeController {
  static getAllOffices(req, res) {
    return res.status(200).json({
      status: 200,
      data: politicalOffice,
    });
  }

  static getOneOffice(req, res)	{
    const getOffice = politicalOffice.find(office => office.id === parseInt(req.params.id, 10));
    if (getOffice) {
      return res.status(200).json({
        status: 200,
        data: getOffice,
      });
    }
    res.status(4040).json({
      status: 404,
      error: 'Office does not exist',
    });
  }

  static addNewOffice(req, res) {
    const { type, name } = req.body;
    if (!type || !name) {
      res.status(400).json({
        status: 404,
        error: 'Missing fields not allowed',
      });
    }

    const newOffice = {
      id: politicalOffice.length + 1,
      name,
      type,
    };
    politicalOffice.push(newOffice);
    return res.status(201).json({
      status: 201,
      data: newOffice,
    });
  }
}


export default OfficeController;
