import { UserValidation } from './user.validation';
import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../../middleware/validateRequest';
import { adminValidation } from '../admin/admin.validation';
// import authType from '../../../middleware/authType';
// import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-user',
  // authType(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.CreateuserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.get('/', UserControllers.createUser);

export const userRoutes = router;
