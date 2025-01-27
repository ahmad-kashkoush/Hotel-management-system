const BaseModel = require("./BaseModel");

class GuestModel extends BaseModel {
  constructor(pool) {
    super(pool, 'guests');
  }
}

module.exports = GuestModel;
