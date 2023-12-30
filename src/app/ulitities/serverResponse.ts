/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  error?: string;
  meta?: any;
};

const serverResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    error: data.error,
    meta: data.meta,
  });
};

export default serverResponse;
