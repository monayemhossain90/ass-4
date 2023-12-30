import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import authType from '../../../middleware/authType';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.register,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/change-password',
  authType(USER_ROLE.user, USER_ROLE.admin),
  AuthControllers.changePassword,
);
router.post('/refresh-token', AuthControllers.refreshToken);

export const AuthRoutes = router;
