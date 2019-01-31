import { userInfo } from 'os';
import dbConfig from '../database/dbConfig';
import Parties from '../database/partyData';

class PartyController {
  static getAllParties(req, res) {
    dbConfig.query('SELECT * FROM politico_andela.parties')
      .then(parties => res.status(200).json({
        status: 200,
        data: parties.rows,
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

  static getOneParty(req, res) {
    const { id } = req.params;
    dbConfig.query(`SELECT * FROM politico_andela.parties WHERE id = ${id}`)
      .then((party) => {
        if (party.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: party.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'The party you are looking for does not exist',
        });
      })
      .catch(err => res.status(400).json({
        status: 400,
        error: err.message,
      }));
  }

  static deleteParty(req, res) {
    const id = parseInt(req.params.id, 10);
    dbConfig.query(`DELETE FROM politico_andela.parties WHERE id = ${id}`)
      .then((party) => {
        if (party.rowCount) {
          return res.status(200).json({
            status: 200,
            message: 'Party deleted',
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'Party not found',
        });
      })
      .catch(err => res.status(404).json({
        status: 'error',
        data: err.message,
      }));
  }

  static addNewParty(req, res) {
    req.checkBody('name', 'name field is require').notEmpty().trim();
    req.checkBody('Acronym', 'Acronym field is require').notEmpty().trim();
    req.checkBody('hqAddress', 'hqAddress field is require').notEmpty().trim();
    req.checkBody('logoUrl', 'logoUrl field is require').notEmpty().isURL().trim();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    const {
      name,
      Acronym,
      hqAddress,
      logoUrl,
    } = req.body;
    dbConfig.query('INSERT INTO politico_andela.parties (name, Acronym, hqAddress, logoUrl')
      .then((party) => {
        if (party.rowCount > 0) {
          return res.status(201).json({
            status: 201,
            data: party.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'Party could not be added',
        });
      })
      .catch(err => res.status(400).json({
        status: 400,
        error: err.message,
      }));
  }

  static editParty(req, res) {
    req.checkBody('name', 'name field is require').notEmpty().trim();
    req.checkBody('Acronym', 'Acronym field is require').notEmpty().trim();
    req.checkBody('hqAddress', 'hqAddress field is require').notEmpty().trim();
    req.checkBody('logoUrl', 'logoUrl field is require').notEmpty().isURL().trim();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    const {
      name,
      Acronym,
      hqAddress,
      logoUrl,
    } = req.body;
    const id = parseInt(req.params.id, 10);
    const query = `UPDATE politico_andela.parties SET name =${name}, Acronym = '${Acronym}', hqAddress = '${hqAddress}', logoUrl = '${logoUrl}' WHERE id = ${id} RETURNING *`;
    dbConfig.query(query)
      .then((party) => {
        if (party.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Party updated',
            data: party.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'Party cannot be updated',
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: 404,
          error: err.message,
        });
      });
  }
}

export default PartyController;
