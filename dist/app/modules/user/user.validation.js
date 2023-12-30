"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const CreateuserValidationSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    password: zod_1.z
        .string({
        invalid_type_error: 'Password must be String',
    })
        .max(16, {
        message: 'Password can not be more than 16 Characters',
    })
        .optional(),
    role: zod_1.z.enum(['user', 'admin']).optional(),
});
exports.UserValidation = {
    CreateuserValidationSchema,
};
