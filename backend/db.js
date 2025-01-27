const BookingModel = require("./models/BookingsModel");
const CabinModel = require("./models/CabinsModel");
const GuestModel = require("./models/GuestsModel");
const SettingsModel = require("./models/settingsModel");
const UserModel = require("./models/UsersModel")
const { pool } = require("./server");

// export models to use for interacting with database
module.exports = {
    Settings: new SettingsModel(pool),
    Bookings: new BookingModel(pool),
    Cabins: new CabinModel(pool),
    Guests: new GuestModel(pool),
    Users: new UserModel(pool)
}
