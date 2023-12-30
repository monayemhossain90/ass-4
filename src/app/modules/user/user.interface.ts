/* eslint-disable no-unused-vars */
import mongoose, { Schema } from 'mongoose';

export interface PasswordHistory {
  password: string;
  timestamp: Date;
}
export interface TUser {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  passwordChanged: boolean;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  passwordHistory: PasswordHistory[];
}
export interface UserModel extends mongoose.Model<TUser> {
  isUserExistsByUsername(username: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPass: string,
    hashedPass: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
