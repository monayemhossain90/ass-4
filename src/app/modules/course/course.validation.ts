import { z } from 'zod';

const tagValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean().optional(),
});

const detailsValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Title Must Be String',
      required_error: 'Title is required',
    }),
    instructor: z.string({ required_error: 'Instructor is required' }),
    categoryId: z.string({ required_error: 'Category is required' }),
    price: z.number({ required_error: 'Price is required' }),
    tags: z.array(tagValidationSchema),
    startDate: z.string({ required_error: 'Start Date is required' }),
    endDate: z.string({ required_error: 'End Date is required' }),
    language: z.string({ required_error: 'Language is required' }),
    provider: z.string({ required_error: 'Provider is required' }),
    durationInWeeks: z.number().optional(),
    details: detailsValidationSchema,
  }),
});

const updateTagValidationSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const updatedDetailsValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(updateTagValidationSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    durationInWeeks: z.number().optional(),
    details: updatedDetailsValidationSchema.optional(),
  }),
});

export const courseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
