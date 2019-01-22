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
      if(getParty) {
          res.status(200).json({
              status: 200,
              data: getParty,
          })
      }
      return res.status(404).json({
          status: 404,
          error: 'Party does not exist',
      })
  }
}

export default partyController;
