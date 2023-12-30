"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.UserControllers = void 0;
const serverResponse_1 = __importDefault(require("../../ulitities/serverResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const wrapAsync_1 = __importDefault(require("../../ulitities/wrapAsync"));
const createUser = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield user_service_1.UserServices.createUserIntoDB(userData);
    (0, serverResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User created successfully',
        data: result,
    });
}));
const createAdmin = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { admin: adminData } = req.body;
    const savedAdmin = yield user_service_1.UserServices.createAdminIntoDB(adminData);
    (0, serverResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin is Created Succesfully',
        data: savedAdmin,
    });
}));
exports.UserControllers = {
    createUser,
    createAdmin,
};
