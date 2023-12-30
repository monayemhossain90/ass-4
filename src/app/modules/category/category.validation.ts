import { z } from 'zod';
export const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string',
    }),
  }),
});
export const categoryValidation = {
  categoryValidationSchema,
};
