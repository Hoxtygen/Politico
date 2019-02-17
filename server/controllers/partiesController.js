import { userInfo } from 'os';
import validator from 'express-validator';
/* import { check, validationResult } from 'express-validator'; */
import dbConfig from '../database/dbConfig';
import validations from '../helper/validateLogin';


class PartyController {
  static getAllParties(req, res) {
    dbConfig.query('SELECT * FROM politico_andela.parties')
      .then((parties) => {
        if (parties.rows.length === 0) {
          return res.status(204).json({
            status: 204,
            error: 'Database Empty',
            data: parties.rows,
          });
        }
        return res.status(200).json({
          status: 200,
          data: parties.rows,
        });
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

  static getOneParty(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Input must be a number',
      });
    }
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
      .catch(err => res.status(500).json({
        status: 500,
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
      .catch(err => res.status(500).json({
        status: 500,
        data: err.message,
      }));
  }

  static addNewParty(req, res) {
    const errors = validations.validateNewParty(req.body);
    if (errors.error) {
      return res.status(400).json({
        status: 400,
        error: errors.error.details[0].message,
      });
    }

    const {
      name,
      Acronym,
      hqAddress,
      logoUrl,
    } = req.body;
    dbConfig.query('INSERT INTO politico_andela.parties (name, Acronym, hqAddress, logoUrl) VALUES ($1, $2, $3, $4) RETURNING *', [name, Acronym, hqAddress, logoUrl])
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
      .catch(err => res.status(500).json({
        status: 500,
        error: err.message,
      }));
  }

  static editParty(req, res) {
    const errors = validations.validateEditParty(req.params.id, req.body.name);
    if (errors.error) {
      return res.status(400).json({
        status: 400,
        error: errors.error.details[0].message,
      });
    }

    const { name } = req.body;
    const id = parseInt(req.params.id, 10);
    dbConfig.query('UPDATE politico_andela.parties SET name =$1 WHERE id = $2 RETURNING *', [name, id])
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
          error: 'No party with such Id ',
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          error: err.message,
        });
      });
  }
}

export default PartyController;
