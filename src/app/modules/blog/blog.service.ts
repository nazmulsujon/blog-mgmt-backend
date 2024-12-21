import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { Types } from 'mongoose';

// save a blog data into db
const createBlogIntoDB = async (userId: Types.ObjectId, payload: TBlog) => {
  const blogData = { author: userId, ...payload };

  const result = (await Blog.create(blogData)).populate('author');
  return result;
};

// get all blogs from db
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQueries = new QueryBuilder(Blog.find(), query)
    .search(['title', 'content'])
    .filter()
    .sort();

  const result = await blogQueries.modelQuery.populate('author');

  return result;
};

// udpdate blog
const updateBlogIntoDB = async (
  id: string,
  userId: string,
  payload: Partial<TBlog>,
) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found with given id!');
  }

  if (userId !== blog.author?.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not the author of this blog!',
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });

  return result?.populate('author');
};

// delete blog into db
const deleteBlogFromDB = async (id: string, userId: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found with given id!');
  }

  if (userId !== blog.author?.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not the author of this blog!',
    );
  }

  await Blog.findByIdAndDelete(id);
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
