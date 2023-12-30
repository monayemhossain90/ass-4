import express from 'express';

import { courseControllers } from './course.controller';
import validateRequest from '../../../middleware/validateRequest';
import { courseValidation } from './course.validation';
import authType from '../../../middleware/authType';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Get All Courses
router.get('/', courseControllers.getAllCourses);

// Get Single Course
router.get('/:id', courseControllers.getSingleCourse);

// Get Course by ID with Reviews
router.get('/:courseId/reviews', courseControllers.getCourseWithReviews);

// Update a Course
router.put(
  '/:courseId',
  authType(USER_ROLE.admin),
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseControllers.updateCourse,
);

export const CourseRoutes = router;
