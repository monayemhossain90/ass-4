import mongoose from 'mongoose';
import { TErrorPayload, TErrorPaths } from '../interface/errors';

const castErrorHandler = (err: mongoose.Error.CastError): TErrorPayload => {
  const errorSources: TErrorPaths = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID!!',
    errorSources,
  };
};

export default castErrorHandler;
