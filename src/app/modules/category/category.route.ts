import authType from '../../../middleware/authType';
import { USER_ROLE } from '../user/user.constant';
import { categoryControllers } from './category.controller';
import express from 'express';
const router = express.Router();

router.post('/', authType(USER_ROLE.admin), categoryControllers.createCategory);
router.get('/', categoryControllers.getCategories);

export const CategoryRoutes = router;
