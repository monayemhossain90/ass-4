/* eslint-disable @typescript-eslint/no-explicit-any */

import { TUser } from './user.interface';
import { User } from './user.model';
import { Admin } from '../admin/admin.model';


const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  const result = await User.create(userData);
  return result.toObject();
};

const createAdminIntoDB = async (adminData: {
  username: string;
  email: string;
  password?: string;
}) => {
  const newAdmin = new Admin(adminData);
  const savedAdmin = await newAdmin.save();
  return savedAdmin;
};





export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,

};
