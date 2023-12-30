import httpStatus from 'http-status';
import appError from '../../errorHandle/appError';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createcategoryIntoDB = async (categoryData: TCategory) => {
  const result = await Category.create(categoryData);
  return result;
};

const getAllCategoriesFromDB = async () => {
  try {
    const categories = await Category.find(
      {},
      { _id: 1, name: 1, },
    )
    
 

    return categories;
  } catch (error) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      'Error Retrieving categories from the database',
    );
  }
};

export const CategoryServices = {
  createcategoryIntoDB,
  getAllCategoriesFromDB,
};
