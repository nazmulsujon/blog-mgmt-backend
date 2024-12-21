import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

// create a new blog
const createBlog = catchAsync(async (req, res) => {
  //   console.log('user from req by token', req.user);
  const { userId } = req.user;
  const result = await BlogServices.createBlogIntoDB(userId, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});

// get all blogs
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

// update blog
const updateBlog = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await BlogServices.updateBlogIntoDB(
    req.params.id,
    userId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

//delete blog
const deleteBlog = catchAsync(async (req, res) => {
  const { userId } = req.user;
  await BlogServices.deleteBlogFromDB(req.params.id, userId);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
