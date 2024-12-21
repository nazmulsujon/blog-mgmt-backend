import { NextFunction, Request, Response } from 'express';
import config from '../config';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 400;
  let message = 'Something went wrong';

  // send response
  return res.status(err?.status || statusCode).send({
    success: false,
    message: err?.message || message,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
