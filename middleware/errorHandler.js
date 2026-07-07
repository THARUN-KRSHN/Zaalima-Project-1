import { AppError } from '../utils/AppError.js';

const errorHandler = (err, req, res, next) => {
    console.error('Unhandled Error Caught:', err);

    let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    let message = err.message || 'Internal Server Error';
    let errorCode = err.errorCode || err.codeName || 'SERVER_ERROR';
    let validationErrors = err.validationErrors || null;

    
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errorCode = 'VALIDATION_FAILED';
        validationErrors = {};
        Object.keys(err.errors).forEach((key) => {
            validationErrors[key] = err.errors[key].message;
        });
    }

    
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Resource not found with id of ${err.value}`;
        errorCode = 'RESOURCE_NOT_FOUND';
    }

    
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
        errorCode = 'DUPLICATE_ENTRY';
    }

    res.status(statusCode).json({
        success: false,
        errorCode,
        message,
        ...(validationErrors ? { validationErrors } : {}),
        timestamp: new Date().toISOString(),
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

export default errorHandler;
