export class AppError extends Error {
    constructor(message, statusCode, errorCode = 'SERVER_ERROR', validationErrors = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.validationErrors = validationErrors;
        Error.captureStackTrace(this, this.constructor);
    }
}
