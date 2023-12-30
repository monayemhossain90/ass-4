import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is Required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(4, 'Password must be at least 4 characters'),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum(['user', 'admin']),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
  changePasswordValidation,
};
