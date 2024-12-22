import { Router } from 'express';
import auth from '../../middlewares/auth';
import { AdminControllers } from './admin.controller';

const router = Router();

// delete blog by admin
router.delete('/blogs/:id', auth('admin'), AdminControllers.deleteBlog);

// block user by admin
router.patch('/users/:userId/block', auth('admin'), AdminControllers.blockUser);

export const AdminRoutes = router;
