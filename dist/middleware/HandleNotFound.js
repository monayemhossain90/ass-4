"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleNotFound = (req, res, next) => {
    const errorMessage = 'API Not Found!!';
    const statusCode = http_status_1.default.NOT_FOUND;
    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: '',
    });
};
exports.default = handleNotFound;
