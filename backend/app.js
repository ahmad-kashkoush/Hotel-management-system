const globalErrorHandler=require("./controllers/errorController");
const express = require("express");
const guestsRouter = require("./routers/guests-router");
const bookingsRouter = require("./routers/bookings-router");
const cabinsRouter = require("./routers/cabins-router");
const settingsRouter = require("./routers/settings-router");
const AppError = require("./AppError");

const app = express();


// done: Middleware to parse json body
app.use(express.json());



// done: prepare routes
app.use("/api/v1/guests", guestsRouter);
app.use("/api/v1/cabins", cabinsRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/settings", settingsRouter);
app.all('*', (req, res, next) => {
    next(new AppError("Request cann't be handled", 404))
});
// done: prepare error handling
app.use(globalErrorHandler);
module.exports = app;
// done: bookings route
// done: settings route
// done: cabins route
// done: guests route
// done: handle unhandled requests

// irrelevent: Connect prisma with my application
// done: create models
// done: crud operations on all the models