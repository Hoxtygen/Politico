import Parties from '../database/partyData';

class partyController {
  static getAllParties(req, res) {
    return res.status(200).json({
      status: 200,
      data: Parties,
    });
  }

  static getOneParty(req, res) {
    const getParty = Parties.find(party => party.id === parseInt(req.params.id, 10));
    if (getParty) {
      res.status(200).json({
        status: 200,
        data: getParty,
      });
    } else {
      res.status(404).json({
        status: 404,
        error: 'Party does not exist',
      });
    }
  }

  static deleteParty(req, res) {
    const id = parseInt(req.params.id, 10);
    let deleted;
    Parties.filter((party, index) => {
      if (party.id === id) {
        Parties.splice(index, 1);
        deleted = party;
      }
    });
    if (deleted) {
      return res.status(200).json({
        status: 200,
        message: 'party deleted successfully',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Party not found',
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

export default partyController;
