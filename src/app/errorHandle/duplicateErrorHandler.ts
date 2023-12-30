/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorPaths, TErrorPayload } from '../interface/errors';

const duplicateErrorHandler = (err: any): TErrorPayload => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorPaths = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Message From Duplicate Error',
    errorSources,
  };
};

export default duplicateErrorHandler;
