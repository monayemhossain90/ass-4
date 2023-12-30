"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const duplicateErrorHandler = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid Message From Duplicate Error',
        errorSources,
    };
};
exports.default = duplicateErrorHandler;
