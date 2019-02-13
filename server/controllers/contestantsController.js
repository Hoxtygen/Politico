import dbConfig from '../database/dbConfig';
import validations from '../helper/validateLogin';

class ContestantsController {
  static getAllContestants(req, res) {
    dbConfig.query('SELECT * FROM politico_andela.contestants')
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
    dbConfig.query('INSERT INTO politico_andela.contestants (contestant, office, party) VALUES ($1, $2, $3) RETURNING *', [contestant, office, party])
      .then((contest) => {
        if (contest.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            data: contest.rows,
          });
        }
      })
      .catch((err) => {
        if (err.message.includes('unique')) {
          console.log(err.message);
          res.status(500).json({
            status: 500,
            error: 'You already showed interest in an office',
          });
        }
      });
  }
}

export default ContestantsController;
