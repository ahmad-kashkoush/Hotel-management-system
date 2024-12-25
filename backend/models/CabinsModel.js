const { pool } = require("./../server");
const BaseModel = require("./BaseModel");
class CabinModel extends BaseModel {
  constructor(pool) {
    super(pool, 'cabins');
  }
}

const Cabin = new CabinModel(pool);

module.exports = Cabin;