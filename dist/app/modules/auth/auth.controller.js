"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const serverResponse_1 = __importDefault(require("../../ulitities/serverResponse"));
const wrapAsync_1 = __importDefault(require("../../ulitities/wrapAsync"));
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../config"));
const register = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.register(req.body);
    (0, serverResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User Registered successfully',
        data: {
            _id: result._id,
            username: result.username,
            email: result.email,
            role: result.role,
        },
    });
}));
const loginUser = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body);
    const { accessToken, refreshToken, user } = result.data;
    // Set the refresh token as an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config_1.default.node_env === 'production',
    });
    let successMessage = '';
    if (user.role === 'user') {
        successMessage = 'User is logged in successfully!';
    }
    else if (user.role === 'admin') {
        successMessage = 'Admin is logged in successfully!';
    }
    (0, serverResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: successMessage,
        data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            accessToken,
        },
    });
}));
const changePassword = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const { currentPassword, newPassword, } = req.body;
    const result = yield auth_service_1.AuthServices.changePassword(decodedToken, {
        currentPassword,
        newPassword,
    });
    res.status(200).json(result);
}));
const refreshToken = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
        throw new Error('Invalid Token');
    }
    const result = yield auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, serverResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User is logged in succesfully!',
        data: result,
    });
}));
exports.AuthControllers = {
    loginUser,
    register,
    changePassword,
    refreshToken,
};
