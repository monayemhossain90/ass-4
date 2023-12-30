/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CategoryServices } from './category.service';
import wrapAsync from '../../ulitities/wrapAsync';
import serverResponse from '../../ulitities/serverResponse';
import httpStatus from 'http-status';
import { TCategory } from './category.interface';


// Create a Category
const createCategory = wrapAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await CategoryServices.createcategoryIntoDB(body as TCategory);
  return serverResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category Created successfully',
    data: result,
  });
});

// Get All Categories
const getCategories = wrapAsync(async (req: Request, res: Response) => {
  const categories = await CategoryServices.getAllCategoriesFromDB();
  return serverResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories Retrieved successfully',
    data: categories,
  });
});

export const categoryControllers = {
  createCategory,
  getCategories,
};
