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
exports.AuthServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../user/user.model");
const appError_1 = __importDefault(require("../../errorHandle/appError"));
const http_status_1 = __importDefault(require("http-status"));
const assistPassword_1 = require("../../ulitities/assistPassword");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const password = payload.password;
    const role = payload.role;
    const hashedPassword = yield assistPassword_1.assistPassword.hashPassword(password);
    if (role !== 'user' && role !== 'admin') {
        throw new Error('Invalid Role Specified');
    }
    const result = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { password: hashedPassword, role: role }));
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ username: payload === null || payload === void 0 ? void 0 : payload.username }).select('+password +passwordHistory');
    console.log({ username: payload === null || payload === void 0 ? void 0 : payload.username });
    if (!user) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'The User is not Found!!');
    }
    // Check if both username and password are valid
    if ((user === null || user === void 0 ? void 0 : user.username) !== (payload === null || payload === void 0 ? void 0 : payload.username)) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Username does not Match!!!!!!');
    }
    if (!(yield (user_model_1.User === null || user_model_1.User === void 0 ? void 0 : user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))) {
        throw new Error('Password do not matched!!!!');
    }
    const jwtPayload = {
        username: user.username,
        role: user.role,
        email: user.email,
    };
    const accessToken = auth_utils_1.AuthUtils.createAccessToken(jwtPayload);
    const refreshToken = auth_utils_1.AuthUtils.createRefreshToken(jwtPayload);
    return {
        data: {
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            accessToken,
            refreshToken,
        },
    };
});
const changePassword = (decodedToken, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = decodedToken;
    if (!decodedToken || !(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.username)) {
        throw new Error('Invalid Token Format');
    }
    // Fetch user from the database
    const user = yield user_model_1.User.findOne({ username }).select('+password +passwordHistory');
    if (!user) {
        return {
            success: false,
            statusCode: 400,
            message: 'User not Found!!!',
            data: null,
        };
    }
    // Update password
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    // Check if the new password is unique and not among the last 2 used
    const isUniquePassword = user.passwordHistory.every((history) => !bcrypt_1.default.compareSync(payload.newPassword, history.password));
    if (!isUniquePassword) {
        const lastUsedTimestamp = user.passwordHistory[0].timestamp.toLocaleString();
        return {
            success: false,
            statusCode: 400,
            message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${lastUsedTimestamp}).`,
            data: null,
        };
    }
    // Verify current password
    if (!(yield user_model_1.User.isPasswordMatched(payload.currentPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Password do not Matched!!!');
    // Update password history
    const updatedPasswordHistory = [
        { password: user.password, timestamp: user.updatedAt },
        ...user.passwordHistory.slice(0, 1),
    ];
    yield user_model_1.User.findOneAndUpdate({ username }, {
        password: hashedPassword,
        updatedAt: new Date(),
        passwordHistory: updatedPasswordHistory,
    });
    // Return success result without sensitive user data
    return {
        success: true,
        statusCode: 200,
        message: 'Password changed successfully',
        data: {
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: new Date(),
        },
    };
});
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = auth_utils_1.AuthUtils.verifyToken(refreshToken, config_1.default.jwt_refresh_secret);
    const { username } = decodedToken;
    const user = yield user_model_1.User.findOne({ username });
    if (!user) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid Token');
    }
    const jwtPayload = {
        email: user.email,
        username: user.username,
        role: user.role,
    };
    const accessToken = auth_utils_1.AuthUtils.createAccessToken(jwtPayload);
    return {
        accessToken,
    };
});
exports.AuthServices = {
    loginUser,
    register,
    changePassword,
    refreshToken,
};
