"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtils = exports.verifyToken = void 0;
// const secret = config.jwt_access_secret as string;
// const createToken = (jwtPayload: JwtPayload): string => {
//   return jwt.sign(jwtPayload, secret, {
//     expiresIn: config.jwt_access_expires_in,
//   });
// };
// const verifyToken = (token: string): any => {
//   return jwt.verify(token, secret);
// };
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const createToken = (jwtPayload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, {
        expiresIn,
    });
};
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
exports.AuthUtils = {
    createAccessToken: (jwtPayload) => createToken(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in),
    createRefreshToken: (jwtPayload) => createToken(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in),
    verifyToken: (token, secret) => (0, exports.verifyToken)(token, secret),
};
