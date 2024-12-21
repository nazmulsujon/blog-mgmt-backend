import { Router } from 'express';
import auth from '../../middlewares/auth';
import { AdminControllers } from './admin.controller';

const router = Router();

// delete blog
router.delete('/blogs/:id', auth('admin'), AdminControllers.deleteBlog);

export const AdminRoutes = router;
