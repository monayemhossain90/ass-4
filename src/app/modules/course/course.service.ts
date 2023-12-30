/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */

import mongoose from 'mongoose';
import httpStatus from 'http-status';
import QueryBuilder from '../../../assembler/QueryBuilder';
import { Review } from '../review/review.model';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import appError from '../../errorHandle/appError';

const createCourseIntoBD = async (courseData: TCourse): Promise<TCourse> => {
  const createdCourse = await Course.create(courseData);
  return createdCourse.toObject();
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate({
      path: 'createdBy',
      select: '_id username email role',
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const countCourses = async () => {
  const count = await Course.countDocuments();
  return count;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id)
    .populate('categoryId')
    .populate({
      path: 'createdBy',
      select: '_id username email role',
    })
    .lean();
  return result;
};

// Get Course by ID with Reviews
const getCourseWithReviewsFromDB = async (courseId: string) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new appError(httpStatus.BAD_REQUEST, 'Course Not Found');
    }
    const reviews = await Review.find({ courseId }).populate({
      path: 'createdBy',
      select: '_id username email role',
    });
    return {
      course,
      reviews,
    };
  } catch (error) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      'Error Retrieving course and Reviews from the Database',
    );
  }
};

const getBestCourseFromDB = async () => {
  const bestCourse = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: {
          $cond: {
            if: { $isArray: '$reviews' },
            then: { $avg: '$reviews.rating' },
            else: 0,
          },
        },
        reviewCount: {
          $cond: {
            if: { $isArray: '$reviews' },
            then: { $size: '$reviews' },
            else: 0,
          },
        },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        title: 1,
        instructor: 1,
        categoryId: 1,
        price: 1,
        tags: 1,
        startDate: 1,
        endDate: 1,
        language: 1,
        provider: 1,
        durationInWeeks: 1,
        details: 1,
        averageRating: 1,
        reviewCount: 1,
      },
    },
  ]);
  // Check if any course was found
  if (!bestCourse.length) {
    return null;
  }
  return bestCourse[0];
};

// Update a Course (Partial Update with Dynamic Update)
const updateCourseIntoDB = async (
  courseId: string,
  updateData: Partial<TCourse>,
) => {
  const { tags, ...courseRemainingData } = updateData;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const updatedCourseWithAll = await Course.findByIdAndUpdate(
        courseId,
        { ...courseRemainingData, tags }, // Include tags in the update
        { new: true, runValidators: true, session },
      );

      if (!updatedCourseWithAll) {
        throw new appError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // Remove tags with isDeleted set to true from the database
      if (tags && Array.isArray(tags)) {
        const tagsToDelete = tags.filter(
          (tag) => tag.name && tag.isDeleted === true,
        );
        await Course.findByIdAndUpdate(
          courseId,
          { $pull: { tags: { $in: tagsToDelete } } },
          { new: true, runValidators: true, session },
        );
      }
    });

    const result = await Course.findById(courseId)
      .populate({
        path: 'createdBy',
        select: '_id username email role',
      })
      .session(session);
    await session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new appError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

export const CourseServices = {
  createCourseIntoBD,
  getAllCoursesFromDB,
  countCourses,
  getSingleCourseFromDB,
  getCourseWithReviewsFromDB,
  getBestCourseFromDB,
  updateCourseIntoDB,
};
