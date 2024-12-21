import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

// create blog
router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

// get all blogs
router.get('/', BlogControllers.getAllBlogs);

// delete blog
router.delete('/:id', auth('user'), BlogControllers.deleteBlog);

// update blog
router.patch('/:id', auth('user'), BlogControllers.updateBlog);

export const BlogRoutes = router;
