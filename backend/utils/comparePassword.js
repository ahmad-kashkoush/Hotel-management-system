const bcrypt = require("bcrypt")
module.exports = async (plain, hashed) => {

    return await bcrypt.compare(plain, hashed);
}