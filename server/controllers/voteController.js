import dbConfig from '../database/dbConfig';
import validations from '../helper/validateLogin';

class VoteController {
  static addNewVote(req, res) {
    const voteErrors = validations.validateVotes(req.body);
    if (voteErrors.error) {
      return res.status(400).json({
        status: 400,
        error: voteErrors.error.details[0].message,
      });
    }

    const {
      office, candidate, voter,
    } = req.body;
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
            status: 400,
            error: 'You have already voted for this office',
          });
        }
      });
  }
}

export default VoteController;
