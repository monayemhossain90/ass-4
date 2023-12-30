"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
const tagValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
const detailsValidationSchema = zod_1.z.object({
    level: zod_1.z.enum(['Beginner', 'Intermediate', 'Advanced']),
    description: zod_1.z.string(),
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: 'Title Must Be String',
            required_error: 'Title is required',
        }),
        instructor: zod_1.z.string({ required_error: 'Instructor is required' }),
        categoryId: zod_1.z.string({ required_error: 'Category is required' }),
        price: zod_1.z.number({ required_error: 'Price is required' }),
        tags: zod_1.z.array(tagValidationSchema),
        startDate: zod_1.z.string({ required_error: 'Start Date is required' }),
        endDate: zod_1.z.string({ required_error: 'End Date is required' }),
        language: zod_1.z.string({ required_error: 'Language is required' }),
        provider: zod_1.z.string({ required_error: 'Provider is required' }),
        durationInWeeks: zod_1.z.number().optional(),
        details: detailsValidationSchema,
    }),
});
const updateTagValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
const updatedDetailsValidationSchema = zod_1.z.object({
    level: zod_1.z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    description: zod_1.z.string().optional(),
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        instructor: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        tags: zod_1.z.array(updateTagValidationSchema).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        language: zod_1.z.string().optional(),
        provider: zod_1.z.string().optional(),
        durationInWeeks: zod_1.z.number().optional(),
        details: updatedDetailsValidationSchema.optional(),
    }),
});
exports.courseValidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
};
