import express from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../../middleware/validateRequest';
import { courseValidation } from './course.validation';
import authType from '../../../middleware/authType';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/',
  authType(USER_ROLE.admin),
  validateRequest(courseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
);
// Get the Best Course Based on Average Review (Rating)
router.get('/best', authType(USER_ROLE.user), courseControllers.getBestCourse);

export const CourseRoute = router;
