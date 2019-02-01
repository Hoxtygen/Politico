import dbConfig from '../database/dbConfig';

class RegisterCandidate {
  static register(req, res) {
    const candidate = req.params.id;
    const { office } = req.body;
    console.log(req.body);
    console.log(req.params.id);
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
          return res.status(400).json({
            status: 400,
            error: 'You are already a candidate for this office',
          });
        }
      });
  }
}

export default RegisterCandidate;
