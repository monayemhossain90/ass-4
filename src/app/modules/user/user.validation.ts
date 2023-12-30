import { z } from 'zod';

const CreateuserValidationSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z
    .string({
      invalid_type_error: 'Password must be String',
    })
    .max(16, {
      message: 'Password can not be more than 16 Characters',
    })
    .optional(),
  role: z.enum(['user', 'admin']).optional(),
});

export const UserValidation = {
  CreateuserValidationSchema,
};
