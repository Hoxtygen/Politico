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
      .catch((err) => {
        return res.status(404).json({
          status: 'error',
          data: err.message,
        });
      });
  }

  static addNewParty(req, res) {
    const {
      name, Acronym, hqAddress, logoUrl,
    } = req.body;
    if (!name || !Acronym || !hqAddress || !logoUrl) {
      return res.status(400).json({
        message: 'Missing fields not allowed',
      });
    }

    const newParty = {
      id: Parties.length + 1,
      name,
      Acronym,
      hqAddress,
      logoUrl,
    };
    Parties.push(newParty);
    return res.status(201).json({
      status: 201,
      data: newParty,
    });
  }

  static editParty(req, res) {
    const {
      name, Acronym, hqAddress, logoUrl,
    } = req.body;

    if (!name || !Acronym || !hqAddress || !logoUrl) {
      return res.status(400).json({
        message: 'Missing fields not allowed',
      });
    }

    const partyId = parseInt(req.params.id, 10);
    let partyToEdit;
    let partyToEditIndex;
    Parties.filter((party, index) => {
      if (party.id === partyId) {
        partyToEdit = party;
        partyToEditIndex = index;
      }
    });

    if (!partyToEdit) {
      return res.status(404).json({
        status: 404,
        error: 'Party not found',
      });
    }

    const updatedParty = {
      id: partyToEdit.id,
      name: req.body.name || partyToEdit.name,
      Acronym: req.body.Acronym || partyToEdit.Acronym,
      hqAddress: req.body.hqAddress || partyToEdit.hqAddress,
      logoUrl: req.body.logoUrl || partyToEdit.logoUrl,
    };

    Parties.splice(partyToEditIndex, 1, updatedParty);
    return res.status(200).json({
      status: 200,
      data: updatedParty,
    });
  }
}

export default PartyController;
