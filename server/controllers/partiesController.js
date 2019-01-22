import Parties from '../database/partyData';

class partyController {
  static getAllParties(req, res) {
    return res.status(200).json({
      status: 200,
      data: Parties,
    });
  }
}

export default partyController;
