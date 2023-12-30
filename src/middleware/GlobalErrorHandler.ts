/* eslint-disable no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import config from '../app/config';
import castErrorHandler from '../app/errorHandle/castErrorHandler';
import duplicateErrorHandler from '../app/errorHandle/duplicateErrorHandler';
// import validationErrorHandler from '../app/errorHandle/validationErrorHandler';
import { TErrorPaths } from '../app/interface/errors';
import appError from '../app/errorHandle/appError';
import { ZodError } from 'zod';
import zodErrorHandler from '../app/errorHandle/zodErrorHandler';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // Setting Default Values
  let statusCode = 500;
  let message = 'Something Went Wrong';
  let errorSources: TErrorPaths = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = castErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = duplicateErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof appError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  // Ultimate Return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};
