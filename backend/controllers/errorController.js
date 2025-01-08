

module.exports = (err, req, res, next) => {
    // development logic

    // production logic
    res.status(err.statusCode|| 500).json({
        status: err.statusText|| "error",
        message: err.message,
        stack: err.stack,
        error: err
    })
};