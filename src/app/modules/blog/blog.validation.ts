import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .trim()
      .min(1, 'Title cannot be empty'),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(1, 'Content cannot be empty'),
    author: z.string().optional(),
    isPublished: z.boolean().optional().default(true), // Optional with default value true
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
