import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

//delete blog
const deleteBlog = catchAsync(async (req, res) => {
  const { userId } = req.user;
  await AdminServices.deleteBlogFromDB(req.params.id, userId);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const AdminControllers = {
  deleteBlog,
};
