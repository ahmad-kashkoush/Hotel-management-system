const express = require("express");
const bookingController = require("../controllers/bookingController");
const router = express.Router();



router.route("/after-date")
    .get(bookingController.getBookingsAfterDate, bookingController.getBookings);

router.route("/stays-after-date")
    .get(bookingController.getStaysAfterDate, bookingController.getBookings);
router.route("/today-activity").get(bookingController.getTodayStatysActivity);
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
