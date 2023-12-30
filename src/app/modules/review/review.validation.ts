import { z } from 'zod';

export const reviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string({
      required_error: 'Course ID is required',
    }),
    rating: z
      .number({
        invalid_type_error: 'Rating must be a number',
        required_error: 'Rating is required',
      })
      .positive({
        message: 'Rating must be positive',
      })
      .min(1, {
        message: 'Rating must be greater than or equal to 1',
      })
      .max(5, {
        message: 'Rating must be less than or equal to 5',
      }),
    review: z.string({
      required_error: 'Review text is required',
    }),
  }),
});

export const reviewValidation = {
  reviewValidationSchema,
};
