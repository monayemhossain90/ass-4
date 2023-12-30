import { z } from 'zod';

export const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      username: z.string({
        required_error: 'Username is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email({
          message: 'Invalid email format',
        }),
      password: z
        .string({
          invalid_type_error: 'Password must be String',
        })
        .max(16, {
          message: 'Password can not be more than 16 Characters',
        })
        .optional(),
    }),
  }),
});

export const adminValidation = {
  createAdminValidationSchema,
};
