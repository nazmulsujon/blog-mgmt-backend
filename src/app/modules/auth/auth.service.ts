import { TUser } from '../user/user.interface';
import bcrypt from 'bcrypt';
import { TUserLogin } from './auth.interface';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';
import AppError from '../../errors/appError';
import { createToken } from './auth.utils';
import config from '../../config';

// create/register user into db
const registerUserIntoDB = async (payload: TUser) => {
  // checking user already exist
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (user) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'User already exist with this email',
    );
  }

  const result = await User.create(payload);

  return result;
};

// login user from db
const loginUserFromDb = async (payload: TUserLogin) => {
  //find user from db
  const user = await User.findOne({ email: payload.email }).select('+password');

  //Check User exist or not
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not Found!');
  }

  //Check User blocked or not
  const isUserBlocked = user?.isBlocked;
  if (isUserBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked!');
  }

  //Check password is mathed or not
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password do not matched!');
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token,
  };
};

export const AuthServices = {
  registerUserIntoDB,
  loginUserFromDb,
};
