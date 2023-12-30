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
exports.reviewControllers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const review_service_1 = require("./review.service");
const serverResponse_1 = __importDefault(require("../../ulitities/serverResponse"));
const wrapAsync_1 = __importDefault(require("../../ulitities/wrapAsync"));
const http_status_1 = __importDefault(require("http-status"));
// Create a Review
const createReview = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_service_1.ReviewServices.createReviewIntoDB(req.body);
    (0, serverResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Review Created successfully',
        data: result,
    });
}));
// Create All Reviews
const getAllReviews = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_service_1.ReviewServices.getAllReviewsFromDB();
    (0, serverResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reviews are Retrived Successfully',
        data: result,
    });
}));
// Create Single Reviews
const getSingleReviews = (0, wrapAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield review_service_1.ReviewServices.getSingleReviewFromDB(id);
    (0, serverResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reviews is Retrived Successfully',
        data: result,
    });
}));
exports.reviewControllers = {
    createReview,
    getAllReviews,
    getSingleReviews,
};
