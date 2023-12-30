/* eslint-disable @typescript-eslint/no-this-alias */

import mongoose, { Schema } from 'mongoose';
import { PasswordHistory, TUser } from './user.interface';
import { UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const PasswordHistorySchema = new Schema<PasswordHistory>({
  password: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please Provide a Password'],
      select: 0,
    },
    passwordChanged: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    passwordHistory: {
      type: [PasswordHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExistsByUsername = async function (username: string) {
  return await User.findOne({ username }).select('+password +passwordHistory');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPass: string,
  hashedPass: string,
) {
  const isMatched = await bcrypt.compare(plainTextPass, hashedPass);
  return isMatched;
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTimes =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTimes > jwtIssuedTimestamp;
};

export const User = mongoose.model<TUser, UserModel>('User', userSchema);
