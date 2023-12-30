"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseControllers = void 0;
const course_service_1 = require("./course.service");
const wrapAsync_1 = __importDefault(require("../../ulitities/wrapAsync"));
const serverResponse_1 = __importDefault(require("../../ulitities/serverResponse"));
const appError_1 = __importDefault(require("../../errorHandle/appError"));
const http_status_1 = __importDefault(require("http-status"));
const createCourse = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // Calculate durationInWeeks
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    const durationInWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    body.durationInWeeks = durationInWeeks;
    const result = yield course_service_1.CourseServices.createCourseIntoBD(body);
    const response = {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Course Created successfully',
        data: result,
    };
    (0, serverResponse_1.default)(res, response);
}));
// Get Entire Course Data
const getAllCourses = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const courses = yield course_service_1.CourseServices.getAllCoursesFromDB(query);
    (0, serverResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Courses fetched successfully',
        meta: {
            page: Number(query === null || query === void 0 ? void 0 : query.page) || 1,
            limit: Number(query === null || query === void 0 ? void 0 : query.limit) || 10,
            total: yield course_service_1.CourseServices.countCourses(),
        },
        data: courses,
    });
}));
// Get Single Couses
const getSingleCourse = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.CourseServices.getSingleCourseFromDB(id);
    (0, serverResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Course is Retrieved succesfully',
        data: result,
    });
}));
// Get Course by ID with Reviews
const getCourseWithReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    try {
        const courseWithReviews = yield course_service_1.CourseServices.getCourseWithReviewsFromDB(courseId);
        return res.status(200).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Course and Reviews Retrieved successfully',
            data: courseWithReviews,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});
// Get the Best Course Based on Average Review (Rating)
const getBestCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bestCourse = yield course_service_1.CourseServices.getBestCourseFromDB();
        if (bestCourse) {
            res.status(200).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Best course retrieved successfully',
                data: {
                    course: bestCourse,
                    averageRating: bestCourse === null || bestCourse === void 0 ? void 0 : bestCourse.averageRating,
                    reviewCount: bestCourse === null || bestCourse === void 0 ? void 0 : bestCourse.reviewCount,
                },
            });
        }
        else {
            res.status(404).json({
                success: false,
                statusCode: http_status_1.default.BAD_REQUEST,
                message: 'No courses found',
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});
// Update a Course (Partial Update with Dynamic Update)
const updateCourse = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const updateData = req.body;
    const updatedCourse = yield course_service_1.CourseServices.updateCourseIntoDB(courseId, updateData);
    if (!updatedCourse) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Course Not Found');
    }
    return (0, serverResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Course Updated Successfully',
        data: updatedCourse,
    });
}));
exports.courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    getCourseWithReviews,
    getBestCourse,
    updateCourse,
};
