import mongoose from 'mongoose';
import { TErrorPaths, TErrorPayload } from '../interface/errors';

const validationErrorHandler = (
  err: mongoose.Error.ValidationError,
): TErrorPayload => {
  const errorSources: TErrorPaths = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default validationErrorHandler;
