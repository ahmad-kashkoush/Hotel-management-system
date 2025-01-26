
const AppError = require("../AppError");
const { Bookings } = require("../db");
const catchAsync = require("../utils/catchAsync");
const getToday = require("../utils/getToday");
exports.getBookings = catchAsync(async (req, res, next) => {
    const bookings = await Bookings.filter({ ...req.query }).findAll();
    res.status(200).json({
        status: "success",
        data: {
            bookings
        }
    })
});
// todo: aliases 
exports.getBookingsAfterDate = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: "todo get all bookings"
    })
});
exports.getStaysAfterDate = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: "todo get all bookings"
    })
});
exports.getTodayStatysActivity = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: "todo get all bookings"
    })
});
/* */
exports.getBookingById = catchAsync(async (req, res, next) => {
    const booking = await Bookings.filter({ ...req.query }).findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            booking
        }
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
    res.status(200).json({
        status: "success",
        data: "todo get all bookings"
    })
});