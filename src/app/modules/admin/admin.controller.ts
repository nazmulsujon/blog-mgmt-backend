import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

//delete blog
const deleteBlog = catchAsync(async (req, res) => {
  await AdminServices.deleteBlogFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

//delete blog
const blockUser = catchAsync(async (req, res) => {
  console.log(req.params.userId);
  await AdminServices.blockUserFromDB(req.params.userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
  });
});

export const AdminControllers = {
  deleteBlog,
  blockUser,
};
