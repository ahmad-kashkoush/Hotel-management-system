
const AppError = require("../AppError");
const { Bookings } = require("../db");
const catchAsync = require("../utils/catchAsync");
const getToday = require("../utils/getToday");
exports.getBookings = catchAsync(async (req, res, next) => {
    const bookings = await Bookings.filter({ ...req.query }).findAll();
    let count = Bookings.totalCount;
    
    if (!count)
        count = "no bookings right now"
    res.status(200).json({
        status: "success",
        count,
        data: bookings
    })
});
// done: aliases 
exports.getBookingsAfterDate = catchAsync(async (req, res, next) => {
    const comingDate = new Date(req.query.date).toISOString().slice(0, 10);
    const todayDate = new Date(getToday({ end: true })).toISOString().slice(0, 10);

    req.query = {
        fields: "created_at,totalprice,extrasprice",
        created_at__gte: comingDate,
        // created_at__lte: todayDate
    }
    next();
});
exports.getStaysAfterDate = catchAsync(async (req, res, next) => {
    const comingDate = new Date(req.query.date).toISOString().slice(0, 10);
    const todayDate = new Date(getToday({ end: true })).toISOString().slice(0, 10);

    /*
    *, guests(fullName)
    */
    req.query = {
        fields: "bookings.*, guests.fullname",
        startdate__gte: comingDate,
        // startdate__lte: todayDate
    }
    next();
});
exports.getTodayStatysActivity = catchAsync(async (req, res, next) => {
    const { rows } = await Bookings.executeRowQuery(`
        select b.*, g.fullname,g.nationality, g.countryflag
        from bookings b
        join guests g on b.guestid=g.id
        WHERE (status = 'unconfirmed' AND startdate = CURRENT_DATE)
        OR (status = 'checked-in' AND enddate = CURRENT_DATE)
        ORDER BY created_at;

        `);
    res.status(200).json({
        status: "success",
        data: rows
    })
});
/* */
exports.getBookingById = catchAsync(async (req, res, next) => {
    const booking = await Bookings.filter({ ...req.query }).findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: booking
    })

});
exports.deleteBooking = catchAsync(async (req, res, next) => {

    const booking = await Bookings.delete(req.params.id);
    if (!booking) {
        return next(new AppError("booking not found", 404));
    }
    res.status(204).json({
        status: "success",
        data: "Booking delete successfully"
    });
});



exports.insertBooking = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: "todo get all bookings"
    })
});

exports.updateBooking = catchAsync(async (req, res, next) => {
    const filteredObj = {};
    Object.keys({ ...req.body }).forEach(key => {
        filteredObj[key.toLowerCase()] = req.body[key];
    })
    const booking = await Bookings.update(req.params.id, { ...filteredObj});
    if (!booking) {
        return next(new AppError("booking not found", 404))
    }
    res.status(200).json({
        status: "success",
        data: booking
    })
});