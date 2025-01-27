const bcrypt = require("bcrypt");
module.exports = async (password) => {
    try {
        // Define the number of salt rounds (default is usually 10)
        const saltRounds = 10;

        // Generate the hashed password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        throw AppError('Error hashing password:', 500);// server error
    }
}