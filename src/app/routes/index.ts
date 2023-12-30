import { Router } from 'express';
import { CourseRoute } from '../modules/course/course.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { reviewsRoutes } from '../modules/review/review.route';
import { CourseRoutes } from '../modules/course/courses.route';
import { userRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AdminRoute } from '../modules/admin/admin.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/course',
    route: CourseRoute,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/reviews',
    route: reviewsRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admins',
    route: AdminRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
