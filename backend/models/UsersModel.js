/* 
table schema
display name
email
phone
*/

const AppError = require("../AppError");
const hashPassword = require("../utils/hashPassword");
const BaseModel = require("./BaseModel");

class UserModel extends BaseModel {
    constructor(pool) {
        super(pool, "users")
    }
    async update(id, data) {
        let password = data.password;
        if (password) {
            password = await hashPassword(password);
            return await super.update(id, { ...data, password });
        }
        return await super.update(id, data);


    }
    async create(data) {
        const { rows } = await this.pool.query(`select * from ${this.tableName} where email=$1   `, [data.email]);
        if (rows.length > 0) {
            throw new AppError("Email already exists", 400);
        }
        if (data.password !== data.passwordConfirm) {
            throw new AppError("password doesn't match password confirm", 400);
        }
        const hashedPassword = await hashPassword(data.password);


        return await super.create({
            name: data.fullName,
            email: data.email,
            password: hashedPassword,
            role: data.role || "admin"
        });
    }
    async find(obj) {
        let whereClause = [];
        for (let [key, value] of Object.entries(obj)) {
            whereClause.push(`${key}='${value}'`);
        }
        this.whereClause = whereClause.length > 0
            ? `where ${whereClause.join(" And ")}`
            : "";
        const found = await super.findAll();
        return found;
    }
}


module.exports = UserModel;
// done:password decryption
// done:validation of data