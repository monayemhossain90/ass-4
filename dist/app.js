"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const GlobalErrorHandler_1 = require("./middleware/GlobalErrorHandler");
const HandleNotFound_1 = __importDefault(require("./middleware/HandleNotFound"));
const app = (0, express_1.default)();
// Parsers Configuration
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// Application Routes
app.use('/api', routes_1.default);
const test = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is saying Hello!!!',
    });
};
app.get('/', test);
app.use(GlobalErrorHandler_1.globalErrorHandler);
app.use(HandleNotFound_1.default);
exports.default = app;
