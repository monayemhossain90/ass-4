/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TAdmin } from './admin.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Please Provide a Password'],
      select: 0,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

adminSchema.pre('save', async function (next) {
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const Admin = model<TAdmin>('Admin', adminSchema);
