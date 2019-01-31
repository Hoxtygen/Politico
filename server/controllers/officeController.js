import dbConfig from '../database/dbConfig';
import politicalOffice from '../database/officeData';

class OfficeController {
  static getAllOffices(req, res) {
    dbConfig.query('SELECT * FROM politico_andela.offices')
      .then(offices => res.status(200).json({
        status: 200,
        data: offices.rows,
      }))
      .catch((err) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.message,
          });
        }
      });
  }

  static getOneOffice(req, res) {
    const id = parseInt(req.params.id, 10);
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
    req.checkBody('name', 'Office name  is required').notEmpty().trim();
    req.checkBody('type', 'Office type is required').notEmpty().trim();
    const { type, name } = req.body;
    const errors = req.validationErrors();
    if (errors) {
      res.status(400).json({
        status: 400,
        errors,
      });
    }
    dbConfig.query('INSERT INTO politico_andela.offices (name, type) VALUES ($1, $2) RETURNING *', [name, type])
      .then((office) => {
        if (office.rowCount > 0) {
          res.status(201).json({
            status: 201,
            data: office.rows,
          });
        } else {
          return res.status(400).json({
            status: 400,
            error: 'Office could not be added',
          });
        }
      })
      .catch((err) => {
        if (err.message.includes('unique')) {
          res.status(400).json({
            status: 400,
            error: 'Office already exist',
          });
        }
      });
  }
}


export default OfficeController;
