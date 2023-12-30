"use strict";
/* eslint-disable no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = __importDefault(require("../app/config"));
const castErrorHandler_1 = __importDefault(require("../app/errorHandle/castErrorHandler"));
const duplicateErrorHandler_1 = __importDefault(require("../app/errorHandle/duplicateErrorHandler"));
const appError_1 = __importDefault(require("../app/errorHandle/appError"));
const zod_1 = require("zod");
const zodErrorHandler_1 = __importDefault(require("../app/errorHandle/zodErrorHandler"));
const globalErrorHandler = (err, req, res, next) => {
    // Setting Default Values
    let statusCode = 500;
    let message = 'Something Went Wrong';
    let errorSources = [
        {
            path: '',
            message: 'Something Went Wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodErrorHandler_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedError = (0, castErrorHandler_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, duplicateErrorHandler_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err instanceof appError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    // Ultimate Return
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
