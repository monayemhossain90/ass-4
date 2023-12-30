/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import serverResponse from '../../ulitities/serverResponse';
import wrapAsync from '../../ulitities/wrapAsync';
import { AuthServices } from './auth.service';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const register = wrapAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);
  serverResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Registered successfully',
    data: {
      _id: result._id,
      username: result.username,
      email: result.email,
      role: result.role,
    },
  });
});


const loginUser = wrapAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken, user } = result.data;

  // Set the refresh token as an HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
  });

  let successMessage = '';
  if (user.role === 'user') {
    successMessage = 'User is logged in successfully!';
  } else if (user.role === 'admin') {
    successMessage = 'Admin is logged in successfully!';
  }

  serverResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: successMessage,
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken,
    },
  });
});

const changePassword = wrapAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const {
    currentPassword,
    newPassword,
  }: { currentPassword: string; newPassword: string } = req.body;
  const result = await AuthServices.changePassword(decodedToken, {
    currentPassword,
    newPassword,
  });
  res.status(200).json(result);
});

const refreshToken = wrapAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) {
    throw new Error('Invalid Token');
  }
  const result = await AuthServices.refreshToken(refreshToken);

  serverResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is logged in succesfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  register,
  changePassword,
  refreshToken,
};
