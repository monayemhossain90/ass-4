import express from 'express';
import { reviewControllers } from './review.controller';
import validateRequest from '../../../middleware/validateRequest';
import { reviewValidation } from './review.validation';
import authType from '../../../middleware/authType';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  authType(USER_ROLE.user),
  validateRequest(reviewValidation.reviewValidationSchema),
  reviewControllers.createReview,
);
router.get('/', reviewControllers.getAllReviews);

router.get('/:id', reviewControllers.getSingleReviews);

export const reviewsRoutes = router;
