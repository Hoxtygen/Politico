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
}

export default partyController;
