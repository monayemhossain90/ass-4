import { ZodError, ZodIssue } from 'zod';
import { TErrorPaths, TErrorPayload } from '../interface/errors';

const zodErrorHandler = (err: ZodError): TErrorPayload => {
  const errorSources: TErrorPaths = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};

export default zodErrorHandler;
