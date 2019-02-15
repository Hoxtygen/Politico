import dbConfig from '../database/dbConfig';
import validations from '../helper/validateLogin';


class OfficesController {
  static getAllOffices(req, res) {
    dbConfig.query('SELECT * FROM politico_andela.offices')
      .then((offices) => {
        if (offices.rows.length === 0) {
          return res.status(204).json({
            status: 204,
            error: 'Database Empty',
            data: offices.rows,
          });
        }
        return res.status(200).json({
          status: 200,
          data: offices.rows,
        });
      })
      .catch((err) => {
        if (err) {
          return res.status(404).json({
            status: 404,
            error: err.message,
          });
        }
      });
  }

  static getOneOffice(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Id must be a number',
      });
    }
    dbConfig.query(`SELECT * FROM politico_andela.offices WHERE id = ${id}`)
      .then((office) => {
        if (office.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: office.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'The office you are looking for could not be found',
        });
      })
      .catch(err => res.status(400).json({
        status: 400,
        error: err.message,
      }));
  }


  static addNewOffice(req, res) {
    const errors = validations.validateNewOffice(req.body);
    if (errors.error) {
      return res.status(400).json({
        status: 400,
        error: errors.error.details[0].message,
      });
    }
    const { type, name } = req.body;
    dbConfig.query('INSERT INTO politico_andela.offices (name, type) VALUES ($1, $2) RETURNING *', [name, type])
      .then((office) => {
        if (office.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            message: 'Office created',
            data: office.rows,
          });
        }
      })
      .catch((err) => {
        if (err.message.includes('unique')) {
          res.status(409).json({
            status: 409,
            error: 'Office already registered',
          });
        }
      });
  }
}


export default OfficesController;
