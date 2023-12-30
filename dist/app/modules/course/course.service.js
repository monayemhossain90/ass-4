"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../../assembler/QueryBuilder"));
const review_model_1 = require("../review/review.model");
const course_model_1 = require("./course.model");
const appError_1 = __importDefault(require("../../errorHandle/appError"));
const createCourseIntoBD = (courseData) => __awaiter(void 0, void 0, void 0, function* () {
    const createdCourse = yield course_model_1.Course.create(courseData);
    return createdCourse.toObject();
});
const getAllCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate({
        path: 'createdBy',
        select: '_id username email role',
    }), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const countCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield course_model_1.Course.countDocuments();
    return count;
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id)
        .populate('categoryId')
        .populate({
        path: 'createdBy',
        select: '_id username email role',
    })
        .lean();
    return result;
});
// Get Course by ID with Reviews
const getCourseWithReviewsFromDB = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_model_1.Course.findById(courseId);
        if (!course) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Course Not Found');
        }
        const reviews = yield review_model_1.Review.find({ courseId }).populate({
            path: 'createdBy',
            select: '_id username email role',
        });
        return {
            course,
            reviews,
        };
    }
    catch (error) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Error Retrieving course and Reviews from the Database');
    }
});
const getBestCourseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const bestCourse = yield course_model_1.Course.aggregate([
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'courseId',
                as: 'reviews',
            },
        },
        {
            $addFields: {
                averageRating: {
                    $cond: {
                        if: { $isArray: '$reviews' },
                        then: { $avg: '$reviews.rating' },
                        else: 0,
                    },
                },
                reviewCount: {
                    $cond: {
                        if: { $isArray: '$reviews' },
                        then: { $size: '$reviews' },
                        else: 0,
                    },
                },
            },
        },
        {
            $sort: {
                averageRating: -1,
            },
        },
        {
            $limit: 1,
        },
        {
            $project: {
                title: 1,
                instructor: 1,
                categoryId: 1,
                price: 1,
                tags: 1,
                startDate: 1,
                endDate: 1,
                language: 1,
                provider: 1,
                durationInWeeks: 1,
                details: 1,
                averageRating: 1,
                reviewCount: 1,
            },
        },
    ]);
    // Check if any course was found
    if (!bestCourse.length) {
        return null;
    }
    return bestCourse[0];
});
// Update a Course (Partial Update with Dynamic Update)
const updateCourseIntoDB = (courseId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags } = updateData, courseRemainingData = __rest(updateData, ["tags"]);
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            const updatedCourseWithAll = yield course_model_1.Course.findByIdAndUpdate(courseId, Object.assign(Object.assign({}, courseRemainingData), { tags }), // Include tags in the update
            { new: true, runValidators: true, session });
            if (!updatedCourseWithAll) {
                throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update course');
            }
            // Remove tags with isDeleted set to true from the database
            if (tags && Array.isArray(tags)) {
                const tagsToDelete = tags.filter((tag) => tag.name && tag.isDeleted === true);
                yield course_model_1.Course.findByIdAndUpdate(courseId, { $pull: { tags: { $in: tagsToDelete } } }, { new: true, runValidators: true, session });
            }
        }));
        const result = yield course_model_1.Course.findById(courseId)
            .populate({
            path: 'createdBy',
            select: '_id username email role',
        })
            .session(session);
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update course');
    }
});
exports.CourseServices = {
    createCourseIntoBD,
    getAllCoursesFromDB,
    countCourses,
    getSingleCourseFromDB,
    getCourseWithReviewsFromDB,
    getBestCourseFromDB,
    updateCourseIntoDB,
};
