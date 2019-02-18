/* eslint-disable no-undef */
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
          message: 'All contestants',
          data: contestants.rows,
        });
      });
  }

  static addContestant(req, res) {
    const { office, party } = req.body;
    const contestant = parseInt(req.params.id, 10);
    if (isNaN(office) || isNaN(party) || isNaN(contestant)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid input',
      });
    }

    // eslint-disable-next-line func-names
    const trueContestant = function () {
      const consQuery = 'SELECT * FROM politico_andela.users WHERE id = $1';
      const value = [contestant];
      dbConfig.query(consQuery, value)
        .then((result) => {
          if (result.rowCount <= 0) {
            return res.status(404).json({
              status: 404,
              error: 'User does not exist',
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            status: 500,
            error: err.message,
          });
        });
    };

    // eslint-disable-next-line func-names
    const trueOffice = function () {
      const officeQuery = 'SELECT * FROM politico_andela.offices WHERE id = $1';
      const value = [office];
      dbConfig.query(officeQuery, value)
        .then((result) => {
          if (result.rowCount <= 0) {
            return res.status(404).json({
              status: 404,
              error: 'Office does not exist',
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            status: 500,
            error: err.message,
          });
        });
    };

    // eslint-disable-next-line func-names
    const trueParty = function () {
      const partyQuery = 'SELECT * FROM politico_andela.parties WHERE id = $1';
      const value = [party];
      dbConfig.query(partyQuery, value)
        .then((result) => {
          if (result.rowCount <= 0) {
            return res.status(404).json({
              status: 404,
              error: 'Party does not exist',
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            status: 500,
            error: err.message,
          });
        });
    };

    //  Single Office

    // eslint-disable-next-line func-names
    /* const SingleOffice = function () {
      const partyQuery = 'SELECT * FROM politico_andela.contestants WHERE office = $1 AND party = $2';
      const value = [office, party];
      dbConfig.query(partyQuery, value)
        .then((result) => {
          if (result.rowCount > 0) {
            return res.status(400).json({
              status: 409,
              error: 'Two contestants from same party not allowed to contest for the same office',
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            status: 500,
            error: err.message,
          });
        });
    }; */

    // eslint-disable-next-line func-names
    const checkUserDupes = function () {
      const userDupesQuery = 'SELECT * FROM politico_andela.contestants WHERE contestant =$1';
      const value = [contestant];
      dbConfig.query(userDupesQuery, value)
        .then((result) => {
          if (result.rowCount > 0) {
            res.status(409).json({
              status: 409,
              error: 'You cannot contest for two different offices in the same election cycle',
            });
          }
        });
    };
//  drop unique constraint from contestant column, will have to drop alltables and reconstruct.
    // eslint-disable-next-line func-names
    const checkDupes = function () {
      const dupeQuery = 'SELECT * FROM politico_andela.contestants WHERE office = $1 AND contestant =$2';
      const values = [office, contestant];
      dbConfig.query(dupeQuery, values)
        .then((result) => {
          if (result.rowCount > 0) {
            res.status(409).json({
              status: 409,
              error: 'You already showed interest in this office',
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
    };


    // eslint-disable-next-line func-names
    const regContestant = function () {
      const constQuery = 'INSERT INTO politico_andela.contestants (contestant, party, office) VALUES ($1, $2, $3) RETURNING *';
      const values = [contestant, party, office];
      dbConfig.query(constQuery, values)
        .then((contest) => {
          if (contest.rowCount > 0) {
            return res.status(201).json({
              status: 201,
              message: 'Contestant added',
              data: contest.rows,
            });
          }
        });
    };

    Promise.all([
      trueContestant(),
      trueOffice(),
      trueParty(),
     /*  checkUserDupes(), */
      checkDupes(),
    ])
      .then(() => {
        regContestant();
      })
      .catch(err => console.log(err));
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
