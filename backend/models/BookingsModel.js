const AppError = require('../AppError');
const BaseModel = require('./BaseModel');

class BookingModel extends BaseModel {
    constructor(pool) {
        super(pool, 'bookings');
        this.totalCount = -1;
    }

    async create(bookingData) {
        const totalPrice = (bookingData.cabinPrice || 0) + (bookingData.extrasPrice || 0);
        return await super.create({ ...bookingData, totalPrice });
    }
    async findAll() {
        const query = `
        SELECT ${this.fields}
        FROM ${this.tableName}
        ${this.fields.includes("cabins") ? "join cabins on cabins.id=bookings.cabinid" : ""}
        ${this.fields.includes("guests") ? "join guests on guests.id=bookings.guestid" : ""}
        ${this.whereClause}
        ${this.sort ? `ORDER BY ${this.sort}` : ""};
        `
        const { rows } = await this.pool.query(query);
        // todo: add pagincation
        let numberOfPages = -1;
        let start = 0;
        let end = rows.length;
        if (this.limit > 0 && rows.length > this.limit) {
            numberOfPages = Math.ceil(rows.length / this.limit);
            if (this.page > numberOfPages || this.page < 1) {
                throw new AppError("page is not in range");
            }
            // range will be [start, end)
            start = (this.page - 1) * this.limit;
            end = Math.min(start + this.limit, rows.length);
        }
        this.totalCount = rows.length;
        return rows.slice(start, end);
    }


    async findById(id) {
        const query = `  SELECT ${this.fields}
        FROM ${this.tableName}
        ${this.fields.includes("cabins") ? "join cabins on cabins.id=bookings.cabinid" : ""}
        ${this.fields.includes("guests") ? "join guests on guests.id=bookings.guestid" : ""}
        where bookings.id=$1;`;
        const { rows } = await this.pool.query(
            query,
            [id]
        );
        rows[0].id=id;
        return rows[0];
    }

    async findActiveBookings() {
        const { rows } = await this.pool.query(
            `SELECT b.*, g.fullName as guestName, c.name as cabinName 
       FROM bookings b 
       LEFT JOIN guests g ON b."guestId" = g.id 
       LEFT JOIN cabins c ON b."cabinId" = c.id 
       WHERE b.status = 'active' 
       ORDER BY b."startDate" DESC`
        );
        return rows;
    }

    async checkAvailability(cabinId, startDate, endDate) {
        const { rows } = await this.pool.query(
            `SELECT COUNT(*) as count 
       FROM bookings 
       WHERE "cabinId" = $1 
       AND status = 'active'
        AND("startDate", "endDate") OVERLAPS($2:: timestamp, $3:: timestamp)`,
            [cabinId, startDate, endDate]
        );
        return parseInt(rows[0].count) === 0;
    }

    async updateStatus(id, status) {
        return await this.update(id, { status });
    }

    async markAsPaid(id) {
        return await this.update(id, { isPaid: true });
    }
}
module.exports = BookingModel;