const { pool } = require("../server");
const BaseModel = require("./BaseModel");

class GuestModel extends BaseModel {
  constructor(pool) {
    super(pool, 'guests');
  }
}

const Guest = new GuestModel(pool);
module.exports = Guest;
