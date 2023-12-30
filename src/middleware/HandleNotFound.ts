/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  const errorMessage = 'API Not Found!!';
  const statusCode = httpStatus.NOT_FOUND;

  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    error: '',
  });
};

export default handleNotFound;
