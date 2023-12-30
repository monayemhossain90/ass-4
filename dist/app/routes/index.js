"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_route_1 = require("../modules/course/course.route");
const category_route_1 = require("../modules/category/category.route");
const review_route_1 = require("../modules/review/review.route");
const courses_route_1 = require("../modules/course/courses.route");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const admin_routes_1 = require("../modules/admin/admin.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/course',
        route: course_route_1.CourseRoute,
    },
    {
        path: '/courses',
        route: courses_route_1.CourseRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.reviewsRoutes,
    },
    {
        path: '/user',
        route: user_route_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.AdminRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
