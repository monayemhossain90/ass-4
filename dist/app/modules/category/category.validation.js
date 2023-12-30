"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = exports.categoryValidationSchema = void 0;
const zod_1 = require("zod");
exports.categoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Name must be a string',
        }),
    }),
});
exports.categoryValidation = {
    categoryValidationSchema: exports.categoryValidationSchema,
};
