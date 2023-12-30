/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CourseServices } from './course.service';
import { TCourse } from './course.interface';
import wrapAsync from '../../ulitities/wrapAsync';
import serverResponse from '../../ulitities/serverResponse';
import appError from '../../errorHandle/appError';
import httpStatus from 'http-status';

const createCourse = wrapAsync(async (req, res) => {
  const body = req.body;
  // Calculate durationInWeeks
  const startDate = new Date(body.startDate);
  const endDate = new Date(body.endDate);
  const durationInWeeks = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
  );
  body.durationInWeeks = durationInWeeks;
  const result = await CourseServices.createCourseIntoBD(body as TCourse);
  const response = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course Created successfully',
    data: result,
  };
  serverResponse(res, response);
});

// Get Entire Course Data
const getAllCourses = wrapAsync(async (req, res) => {
  const { query } = req;
  const courses = await CourseServices.getAllCoursesFromDB(query);
  serverResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courses fetched successfully',
    meta: {
      page: Number(query?.page) || 1,
      limit: Number(query?.limit) || 10,
      total: await CourseServices.countCourses(),
    },
    data: courses,
  });
});

// Get Single Couses
const getSingleCourse = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  serverResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is Retrieved succesfully',
    data: result,
  });
});

// Get Course by ID with Reviews
const getCourseWithReviews = async (req: Request, res: Response) => {
  const courseId = req.params.courseId;

  try {
    const courseWithReviews =
      await CourseServices.getCourseWithReviewsFromDB(courseId);
    return res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course and Reviews Retrieved successfully',
      data: courseWithReviews,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get the Best Course Based on Average Review (Rating)
const getBestCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const bestCourse = await CourseServices.getBestCourseFromDB();
    if (bestCourse) {
      res.status(200).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Best course retrieved successfully',
        data: {
          course: bestCourse,
          averageRating: bestCourse?.averageRating,
          reviewCount: bestCourse?.reviewCount,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'No courses found',
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update a Course (Partial Update with Dynamic Update)
const updateCourse = wrapAsync(async (req: Request, res: Response) => {
  const courseId: string = req.params.courseId;
  const updateData: Partial<TCourse> = req.body;
  const updatedCourse = await CourseServices.updateCourseIntoDB(
    courseId,
    updateData,
  );
  if (!updatedCourse) {
    throw new appError(httpStatus.BAD_REQUEST, 'Course Not Found');
  }
  return serverResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course Updated Successfully',
    data: updatedCourse,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  getCourseWithReviews,
  getBestCourse,
  updateCourse,
};
