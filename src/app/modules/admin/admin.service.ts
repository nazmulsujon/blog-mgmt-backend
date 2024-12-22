import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { Types } from 'mongoose';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

// delete blog into db
const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found with given id!');
  }

  await Blog.findByIdAndDelete(id);
};

// delete blog into db
const blockUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found with given id!');
  }

  await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
};

export const AdminServices = {
  deleteBlogFromDB,
  blockUserFromDB,
};
