"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = exports.reviewValidationSchema = void 0;
const zod_1 = require("zod");
exports.reviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string({
            required_error: 'Course ID is required',
        }),
        rating: zod_1.z
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
        review: zod_1.z.string({
            required_error: 'Review text is required',
        }),
    }),
});
exports.reviewValidation = {
    reviewValidationSchema: exports.reviewValidationSchema,
};
