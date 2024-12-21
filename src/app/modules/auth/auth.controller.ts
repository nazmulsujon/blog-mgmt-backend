import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDb(req.body);
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
};
