/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReviewServices } from './review.service';
import serverResponse from '../../ulitities/serverResponse';
import wrapAsync from '../../ulitities/wrapAsync';
import httpStatus from 'http-status';


// Create a Review
const createReview = wrapAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);
  serverResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review Created successfully',
    data: result,
  });
});

// Create All Reviews
const getAllReviews = wrapAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB();
  serverResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews are Retrived Successfully',
    data: result,
  });
});

// Create Single Reviews
const getSingleReviews = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.getSingleReviewFromDB(id);
  serverResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews is Retrived Successfully',
    data: result,
  });
});

export const reviewControllers = {
  createReview,
  getAllReviews,
  getSingleReviews,
};
