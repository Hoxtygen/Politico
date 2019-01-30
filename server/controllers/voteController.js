import dbConfig from '../database/dbConfig';

class VoteController {
  static addNewVote(req, res) {
    req.checkBody('office', 'Office Id  is required').notEmpty().trim().isNumeric();
    req.checkBody('candidate', 'candidate Id is required').notEmpty().trim().isNumeric();
    req.checkBody('voter', 'Voter Id is required').notEmpty().trim().isNumeric();

    const errors = req.validationErrors();
    if (errors) {
      res.status(400).json({
        status: 400,
        errors,
      });
    }

    const {
      office, candidate, voter,
    } = req.body;
    createdBy = req.params.voter;
    dbConfig.query('INSERT INTO politico_andela.votes (office, candidate, voter) VALUES ($1, $2, $3) RETURNING *', [office, candidate, voter])
      .then((vote) => {
        if (vote.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            data: vote.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'Your vote could not be added',
        });
      })
      .catch((err) => {
        if (err.message.includes('unique')) {
          return res.status(400).json({
            res.status(400).json({
              status: 400,
              error: 'You have already voted for this office',
            })
          })
        }
      })
  }
}

export default VoteController;
