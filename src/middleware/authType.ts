/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

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

import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../app/modules/user/user.model';
import wrapAsync from '../app/ulitities/wrapAsync';
import config from '../app/config';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { USER_ROLE } from '../app/modules/user/user.constant';
import appError from '../app/errorHandle/appError';

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

      const { username, iat } = decodedToken;
      const user = await User.findOne({ username });

      // Authentication
      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid email or password',
          errorSources: [{ path: '', message: 'Invalid email or password' }],
        });
      }

      if (!iat) {
        throw new Error('Invalid token');
      }

      if (
        user.createdAt &&
        User.isJWTIssuedBeforePasswordChanged(user.createdAt, iat)
      ) {
        throw new appError(httpStatus.BAD_REQUEST, 'You are not Authorized!!');
      }

      if (!roles.includes(user.role)) {
        // Authorization
        return res.status(httpStatus.FORBIDDEN).json({
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
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid Token',
        errorSources: [{ path: '', message: 'Invalid token' }],
      });
    }
  });
};

export default authType;
