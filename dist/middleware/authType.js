"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
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
/* import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../app/modules/user/user.model';
import wrapAsync from '../app/ulitities/wrapAsync';
import config from '../app/config';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { USER_ROLE } from '../app/modules/user/user.constant';

const authType = (...roles: Array<keyof typeof USER_ROLE>) => {
  return wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid Token',
          errorSources: [{ path: '', message: 'Invalid Token' }],
        });
      }

      const jwtAccessSecret = config.jwt_access_secret as
        | Secret
        | GetPublicKeyOrSecret;

      const decodedToken = jwt.verify(
        token,
        jwtAccessSecret,
      ) as unknown as JwtPayload;
      
      req.user = decodedToken;
      const { username, email } = decodedToken;
      const user = await User.findOne({ username, email });

      // Authentication
      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid email or password',
          errorSources: [{ path: '', message: 'Invalid email or password' }],
        });
      }

      //* Authorization
      if (!roles.includes(user?.role)) {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          message: 'You are not authorized to perform this action',
          errorSources: [
            {
              path: '',
              message: 'You are not Authorized to Perform this Action',
            },
          ],
        });
      }
      next();
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid Token',
        errorSources: [{ path: '', message: 'Invalid token' }],
      });
    }
  });
};
export default authType; */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../app/modules/user/user.model");
const wrapAsync_1 = __importDefault(require("../app/ulitities/wrapAsync"));
const config_1 = __importDefault(require("../app/config"));
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../app/errorHandle/appError"));
const authType = (...roles) => {
    return (0, wrapAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(http_status_1.default.UNAUTHORIZED).json({
                    success: false,
                    message: 'Invalid Token',
                    errorSources: [{ path: '', message: 'Invalid Token' }],
                });
            }
            const jwtAccessSecret = config_1.default.jwt_access_secret;
            const decodedToken = jsonwebtoken_1.default.verify(token, jwtAccessSecret);
            req.user = decodedToken;
            const { username, iat } = decodedToken;
            const user = yield user_model_1.User.findOne({ username });
            // Authentication
            if (!user) {
                return res.status(http_status_1.default.UNAUTHORIZED).json({
                    success: false,
                    message: 'Invalid email or password',
                    errorSources: [{ path: '', message: 'Invalid email or password' }],
                });
            }
            if (!iat) {
                throw new Error('Invalid token');
            }
            if (user.createdAt &&
                user_model_1.User.isJWTIssuedBeforePasswordChanged(user.createdAt, iat)) {
                throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'You are not Authorized!!');
            }
            if (!roles.includes(user.role)) {
                // Authorization
                return res.status(http_status_1.default.FORBIDDEN).json({
                    success: false,
                    message: 'You are not authorized to perform this action',
                    errorSources: [
                        {
                            path: '',
                            message: 'You are not authorized to perform this action',
                        },
                    ],
                });
            }
            // If both authentication and authorization pass, proceed to the next middleware or route handler
            next();
        }
        catch (error) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'Invalid Token',
                errorSources: [{ path: '', message: 'Invalid token' }],
            });
        }
    }));
};
exports.default = authType;
