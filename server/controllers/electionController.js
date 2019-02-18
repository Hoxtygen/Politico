import dbConfig from '../database/dbConfig';
import validations from '../helper/validateLogin';

class RegisterCandidate {
  static register(req, res) {
    const candidate = parseInt(req.params.id, 10);
    const { office } = req.body;
    const contestant = candidate;
    //  const params = { candidate };
    console.log(req.body);
    //  const errors = validations.validateCandidateRegistration(params);
    /*  if (errors.error) {
      return res.status(400).json({
        status: 400,
        error: errors.error.details[0].message,
      });
    } */
    const candQuery = 'SELECT * FROM politico_andela.contestants WHERE contestant = $1';
    const value = [contestant];
    if (isNaN(office) || isNaN(candidate)) {
      return res.status(400).json({
        status: 400,
        error: 'You entered a non-numeric character in your request',
      });
    }
    //  dbConfig.query('INSERT INTO politico_andela.candidates (office, party, candidate) VALUES ($1, $2, $3) RETURNING *', [office, party, candidate])
    dbConfig.query(candQuery, value)
      .then((result) => {
        if (result.rowCount > 0) {
          dbConfig.query('INSERT INTO politico_andela.candidates (office, candidate) VALUES ($1, $2) RETURNING *', [office, candidate])
            .then((newCandidate) => {
              if (newCandidate.rowCount > 0) {
                return res.status(201).json({
                  status: 201,
                  message: 'Candidate registered',
                  data: newCandidate.rows,
                });
              }
            })
            .catch((err) => {
              if (err.message.includes('unique')) {
                res.status(409).json({
                  status: 409,
                  error: 'Candidate already registered for an office',
                });
              }
            });
        } else {
          return res.status(404).json({
            status: 404,
            error: 'User is not a contestant for any office',
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

  static getResult(req, res) {
    const office = parseInt(req.params.id, 10);
    dbConfig.query('SELECT candidate, office, count (candidate) AS result FROM politico_andela.votes where office = $1 GROUP BY office, candidate', [office])
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: result.rows,
          });
        }
        return res.status(404).json({
          status: 404,
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
