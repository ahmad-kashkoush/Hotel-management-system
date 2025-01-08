const express = require("express");
const bookingController = require("./../controllers/todo-bookingController");
const router = express.Router();





router
    .route('/')
    .get(bookingController.getBookings)
    .post(bookingController.insertBooking);
router
    .route("/:id")
    .get(bookingController.getBookingById)
    .patch(bookingController.updateBooking)
    .delete(bookingController.deleteBooking)


module.exports = router;
