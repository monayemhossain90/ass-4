"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidation = exports.createAdminValidationSchema = void 0;
const zod_1 = require("zod");
exports.createAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        admin: zod_1.z.object({
            username: zod_1.z.string({
                required_error: 'Username is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email({
                message: 'Invalid email format',
            }),
            password: zod_1.z
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
exports.adminValidation = {
    createAdminValidationSchema: exports.createAdminValidationSchema,
};
