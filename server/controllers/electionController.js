import dbConfig from '../database/dbConfig';
import validations from '../helper/validateLogin';

class RegisterCandidate {
  static register(req, res) {
    const candidate = req.params.id;
    const { office } = req.body;
    const params = { candidate, office };
    const errors = validations.validateCandidateRegistration(params);
    if (errors.error) {
      return res.status(400).json({
        status: 400,
        error: errors.error.details[0].message,
      });
    }
    dbConfig.query('INSERT INTO politico_andela.candidates (office, candidate) VALUES ($1, $2) RETURNING *', [office, candidate])
      .then((politician) => {
        if (politician.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            data: politician.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'Candidate could not be registered',
        });
      })
      .catch((err) => {
        if (err.message.includes('unique')) {
          return res.status(409).json({
            status: 409,
            error: 'Candidate already registered for this office',
          });
        }
      });
  }

  static getResult(req, res) {
    const office = parseInt(req.params.id, 10);
    /* const errors = validations.validateResult(office);
    if (errors.error) {
      return res.status(400).json({
        status: 400,
        error: errors.error.details[0].message,
      });
    } */
    dbConfig.query('SELECT candidate, office, count (candidate) AS result FROM politico_andela.votes where office = $1 GROUP BY office, candidate', [office])
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: result.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'No result found for the given office',
        });
      })
      .catch(err => res.status(400).json({
        status: 400,
        error: err.message,
      }));
  }
}

export default RegisterCandidate;
