const BaseModel = require('./BaseModel');

class BookingModel extends BaseModel {
    constructor(pool) {
        super(pool, 'bookings');
    }

    async create(bookingData) {
        const totalPrice = (bookingData.cabinPrice || 0) + (bookingData.extrasPrice || 0);
        return await super.create({ ...bookingData, totalPrice });
    }

    async findByGuestId(guestId) {
        const { rows } = await this.pool.query(
            `SELECT b.*, g.fullName as guestName, c.name as cabinName 
       FROM bookings b 
       LEFT JOIN guests g ON b."guestId" = g.id 
       LEFT JOIN cabins c ON b."cabinId" = c.id 
       WHERE b."guestId" = $1 
       ORDER BY b."startDate" DESC`,
            [guestId]
        );
        return rows;
    }

    async findByCabinId(cabinId) {
        const { rows } = await this.pool.query(
            `SELECT b.*, g.fullName as guestName 
       FROM bookings b 
       LEFT JOIN guests g ON b."guestId" = g.id 
       WHERE b."cabinId" = $1 
       ORDER BY b."startDate" DESC`,
            [cabinId]
        );
        return rows;
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
       AND ("startDate", "endDate") OVERLAPS ($2::timestamp, $3::timestamp)`,
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