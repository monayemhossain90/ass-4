/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import appError from '../../errorHandle/appError';
import httpStatus from 'http-status';
import { TUserLogin } from './auth.interface';
import { assistPassword } from '../../ulitities/assistPassword';
import { AuthUtils } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

interface TRegister
  extends Omit<TUser, 'passwordChanged' | 'passwordHistory'> {}

const register = async (payload: TRegister) => {
  const password = payload.password;
  const role = payload.role;
  const hashedPassword = await assistPassword.hashPassword(password);

  if (role !== 'user' && role !== 'admin') {
    throw new Error('Invalid Role Specified');
  }
  const result = await User.create({
    ...payload,
    password: hashedPassword,
    role: role,
  });
  return result;
};

const loginUser = async (payload: TUserLogin) => {
  const user = await User.findOne({ username: payload?.username }).select(
    '+password +passwordHistory',
  );
  console.log({ username: payload?.username });

  if (!user) {
    throw new appError(httpStatus.BAD_REQUEST, 'The User is not Found!!');
  }
  console.log(user);
  // Check if both username and password are valid
  if (user?.username !== payload?.username) {
    throw new appError(httpStatus.BAD_REQUEST, 'Username does not Match!!!!!!');
  }
  if (await User?.isPasswordMatched(payload?.password, user?.password)) {
    throw new Error('Password do not matched!!!!');
  }

  console.log(payload?.password, user?.password);
  const jwtPayload = {
    username: user.username,
    role: user.role,
    email: user.email,
  };
  const accessToken = AuthUtils.createAccessToken(jwtPayload);
  const refreshToken = AuthUtils.createRefreshToken(jwtPayload);

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
};

const changePassword = async (
  decodedToken: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  const { username } = decodedToken;

  if (!decodedToken || !decodedToken?.username) {
    throw new Error('Invalid Token Format');
  }

  // Fetch user from the database
  const user = await User.findOne({ username }).select(
    '+password +passwordHistory',
  );

  if (!user) {
    return {
      success: false,
      statusCode: 400,
      message: 'User not Found!!!',
      data: null,
    };
  }

  // Update password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  // Check if the new password is unique and not among the last 2 used
  const isUniquePassword = user.passwordHistory.every(
    (history) => !bcrypt.compareSync(payload.newPassword, history.password),
  );

  if (!isUniquePassword) {
    const lastUsedTimestamp =
      user.passwordHistory[0].timestamp.toLocaleString();
    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${lastUsedTimestamp}).`,
      data: null,
    };
  }
  // const isCurrentPasswordValid = await bcrypt.compare(
  //   payload.currentPassword,
  //   user?.password,
  // );
  // if (!isCurrentPasswordValid) {
  //   throw new appError(httpStatus.FORBIDDEN, 'Current Password is Incorrect');
  // }

  // Verify current password
  if (await User.isPasswordMatched(payload.currentPassword, user?.password))
    throw new appError(httpStatus.FORBIDDEN, 'Password do not Matched!!!');
  // Update password history
  const updatedPasswordHistory = [
    { password: user.password, timestamp: user.updatedAt },
    ...user.passwordHistory.slice(0, 1),
  ];

  await User.findOneAndUpdate(
    { username },
    {
      password: hashedPassword,
      updatedAt: new Date(),
      passwordHistory: updatedPasswordHistory,
    },
  );

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
};

const refreshToken = async (refreshToken: string) => {
  const decodedToken = AuthUtils.verifyToken(
    refreshToken,
    config.jwt_refresh_secret as string,
  );
  const { username } = decodedToken as JwtPayload;
  const user = await User.findOne({ username });
  if (!user) {
    throw new appError(httpStatus.BAD_REQUEST, 'Invalid Token');
  }
  const jwtPayload: JwtPayload = {
    email: user.email,
    username: user.username,
    role: user.role,
  };
  const accessToken = AuthUtils.createAccessToken(jwtPayload);
  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  register,
  changePassword,
  refreshToken,
};
