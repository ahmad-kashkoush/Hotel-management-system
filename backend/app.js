// irrelevent: Connect prisma with my application
// done: create models
// done: crud operations on all the models

const express = require("express");
const guestsRouter = require("./routers/guests-router");
const bookingsRouter = require("./routers/bookings-router");
const cabinsRouter = require("./routers/cabins-router");
const settingsRouter = require("./routers/settings-router");

const app = express();


// done: Middleware to parse json body
app.use(express.json());



// done: prepare routes
app.use("/api/v1/guests", guestsRouter);
app.use("/api/v1/cabins", cabinsRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/settings", settingsRouter);
// todo: handle unhandled requests
app.all('*', (req, res, next) => {
    // todo: create appError class
    next(new Error("Request cann't be handled"))
});
// done: prepare error handling
app.use((err, req, res, next) => {
    // todo: create globalError handler
    res.status(500).json({
        status: "error",
        error: err,
        message: err.message,
        stack: err.stack
    })
})
module.exports = app;
// done: bookings route
// done: settings route
// done: cabins route
// done: guests route
