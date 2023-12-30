"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const course_validation_1 = require("./course.validation");
const authType_1 = __importDefault(require("../../../middleware/authType"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
// Get All Courses
router.get('/', course_controller_1.courseControllers.getAllCourses);
// Get Single Course
router.get('/:id', course_controller_1.courseControllers.getSingleCourse);
// Get Course by ID with Reviews
router.get('/:courseId/reviews', course_controller_1.courseControllers.getCourseWithReviews);
// Update a Course
router.put('/:courseId', (0, authType_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(course_validation_1.courseValidation.updateCourseValidationSchema), course_controller_1.courseControllers.updateCourse);
exports.CourseRoutes = router;
