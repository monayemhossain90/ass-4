/* eslint-disable @typescript-eslint/no-explicit-any */

import { TUser } from './user.interface';
import serverResponse from '../../ulitities/serverResponse';
import httpStatus from 'http-status';
import { UserServices } from './user.service';
import wrapAsync from '../../ulitities/wrapAsync';
import { Request,Response } from 'express';


const createUser = wrapAsync(async (req:Request, res:Response) => {
  const userData: TUser = req.body;
  const result = await UserServices.createUserIntoDB(userData);
  serverResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});

const createAdmin = wrapAsync(async (req, res) => {
  const { admin: adminData } = req.body;
  const savedAdmin = await UserServices.createAdminIntoDB(adminData);

  serverResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is Created Succesfully',
    data: savedAdmin,
  });
});

export const UserControllers = {
  createUser,
  createAdmin,
};
