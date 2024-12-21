import { TUser } from '../user/user.interface';
import bcrypt from 'bcrypt';
import { TUserLogin } from './auth.interface';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';
import AppError from '../../errors/appError';

// create/register user into db
const registerUserIntoDB = async (payload: TUser) => {
  // checking user already exist
  const userExist = await User.findOne({ email: payload.email });
  if (userExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'User already exist with this email',
    );
  }

  const result = await User.create(payload);
  result.password = '*******';
  return result;
};

// login user from db
const loginUserFromDb = async (payload: TUserLogin) => {
  const { email, password } = payload;

  // check user not exits
  const userExist = await User.findOne({ email }).select('+password');
  console.log(userExist);
  if (!userExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not exist with this email');
  }

  // check password
  const isPasswordMatch = bcrypt.compareSync(password, userExist?.password);
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password not match');
  }

  // if user is valided then return token
  return {
    token: null,
  };
};
export const AuthServices = {
  registerUserIntoDB,
  loginUserFromDb,
};
