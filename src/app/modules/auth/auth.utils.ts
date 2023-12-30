/* eslint-disable @typescript-eslint/no-explicit-any */

// const secret = config.jwt_access_secret as string;
// const createToken = (jwtPayload: JwtPayload): string => {
//   return jwt.sign(jwtPayload, secret, {
//     expiresIn: config.jwt_access_expires_in,
//   });
// };

// const verifyToken = (token: string): any => {
//   return jwt.verify(token, secret);
// };

import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: string,
): string => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string): any => {
  return jwt.verify(token, secret);
};

export const AuthUtils = {
  createAccessToken: (jwtPayload: JwtPayload): string =>
    createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    ),

  createRefreshToken: (jwtPayload: JwtPayload): string =>
    createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    ),
  verifyToken: (token: string, secret: string): any =>
    verifyToken(token, secret),
};
