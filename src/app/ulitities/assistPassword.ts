/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import config from '../config';

const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};

const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

export const assistPassword = {
  hashPassword,
  comparePassword,
};

