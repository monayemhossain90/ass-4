import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (reviewData: TReview) => {
  const review = new Review(reviewData);
  const savedReview = await review.save();
  return savedReview;
};

const getAllReviewsFromDB = async () => {
  const result = await Review.find().populate('courseId').populate({
    path: 'createdBy',
    select: '_id username email role',
  });
  return result;
};

const getSingleReviewFromDB = async (id: string) => {
  const result = await Review.findById(id).populate('courseId').populate({
    path: 'createdBy',
    select: '_id username email role',
  });
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getSingleReviewFromDB,
};
