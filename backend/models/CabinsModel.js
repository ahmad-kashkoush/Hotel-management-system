const BaseModel = require("./BaseModel");
class CabinModel extends BaseModel {
  constructor(pool) {
    super(pool, 'cabins');
  }
}


module.exports = CabinModel;