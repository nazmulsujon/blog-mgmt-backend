import { AdminRoutes } from '../modules/admin/admin.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { AuthRoutes } from './../modules/auth/auth.route';
import { Router } from 'express';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
