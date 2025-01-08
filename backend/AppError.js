
class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = true;
        this.details = details;
        this.name = this.constructor.name;// AppError

        Error.captureStackTrace(this, this.constructor);
    }
    get statusText() {
        const statusNames = {
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            500: 'Internal Server Error',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: 'Gateway Timeout',
        };
        return statusNames[this.statusCode] || "error";
    }
}






module.exports = AppError








// done: exports AppError class
// done: accepts (messege, status)