"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            required_error: 'Username is Required',
        }),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(4, 'Password must be at least 4 characters'),
    }),
});
const registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        role: zod_1.z.enum(['user', 'admin']),
    }),
});
const changePasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string().min(6),
        newPassword: zod_1.z.string().min(6),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    registerValidationSchema,
    changePasswordValidation,
};
