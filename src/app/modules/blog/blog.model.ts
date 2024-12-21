import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.__v;
        delete ret.isPublished;
        delete ret.isDeleted;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  },
);

export const Blog = model<TBlog>('Blog', blogSchema);
