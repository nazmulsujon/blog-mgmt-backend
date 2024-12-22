import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import AppError from '../errors/appError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../modules/user/user.model';
import { TUserRole } from './auth.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    // checking the token
    if (!authToken || !authToken.startsWith('Bearer ')) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }
    const token = authToken.split(' ')[1];
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }

    // checking if the user is blocked
    const userStatus = user?.isBlocked;

    if (userStatus) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized ');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
