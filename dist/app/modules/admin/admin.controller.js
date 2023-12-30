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
exports.AdminControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const serverResponse_1 = __importDefault(require("../../ulitities/serverResponse"));
const wrapAsync_1 = __importDefault(require("../../ulitities/wrapAsync"));
const admin_service_1 = require("./admin.service");
const getAllAdmins = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminServices.getAllAdminsFromDB();
    (0, serverResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admins are Retrieved Succesfully!!!',
        data: result,
    });
}));
exports.AdminControllers = {
    getAllAdmins,
};
