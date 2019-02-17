import dbConfig from '../database/dbConfig';
import validations from '../helper/validateLogin';

class ContestantsController {
  static getAllContestants(req, res) {
    dbConfig.query('SELECT * FROM politico_andela.users INNER JOIN politico_andela.contestants ON politico_andela.contestants.contestant = politico_andela.users.id INNER JOIN politico_andela.offices ON  politico_andela.offices.id = politico_andela.contestants.office')
      .then((contestants) => {
        if (contestants.rowCount === 0) {
          return res.status(204).json({
            status: 204,
            message: 'Database empty',
            data: contestants.rows,
          });
        }
        return res.status(200).json({
          status: 200,
          data: contestants.rows,
        });
      });
  }

  static addContestant(req, res) {
    const { contestant, office, party } = req.body;
    const id = req.body.contestant;
    const consQuery = 'SELECT * FROM politico_andela.users WHERE id = $1';
    const value = [id];
    dbConfig.query(consQuery, value)
      .then((result) => {
        if (result.rowCount > 0) {
          dbConfig.query('INSERT INTO politico_andela.contestants (contestant, office, party) VALUES ($1, $2, $3) RETURNING *', [contestant, office, party])
            .then((contest) => {
              if (contest.rowCount > 0) {
                return res.status(201).json({
                  status: 201,
                  message: 'Contestant added',
                  data: contest.rows,
                });
              }
            })
            .catch((err) => {
              if (err.message.includes('unique')) {
                res.status(409).json({
                  status: 409,
                  error: 'You already showed interest in an office',
                });
              }
            });
        } else {
          return res.status(404).json({
            status: 404,
            error: 'User not found',
          });
        }
      })
      .catch((err) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: err.message,
          });
        }
      });
  }

  static getSingleOfficeContestants(req, res) {
    const office = parseInt(req.params.office, 10);
    if (isNaN(office)) {
      return res.status(400).json({
        status: 400,
        error: 'Input must be a number',
      });
    }
    const query = 'SELECT contestant, office  FROM politico_andela.contestants  WHERE office = $1 GROUP BY office, contestant';
    const value = [office];
    dbConfig.query(query, value)
      .then((contestants) => {
        if (contestants.rowCount > 0) {
          res.status(200).json({
            status: 200,
            data: contestants.rows,
          });
        } else {
          res.status(204).json({
            status: 204,
            message: 'No contestants found for this office',
          });
        }
      })
      .catch((err) => {
        if (err) {
          res.status(500).json({
            status: 500,
            error: err.message,
          });
        }
      });
  }
}

export default ContestantsController;
