import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { Types } from 'mongoose';
import { Blog } from '../blog/blog.model';

// delete blog into db
const deleteBlogFromDB = async (id: string, userId: Types.ObjectId) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found with given id!');
  }

  await Blog.findByIdAndDelete(id);
};

export const AdminServices = {
  deleteBlogFromDB,
};
