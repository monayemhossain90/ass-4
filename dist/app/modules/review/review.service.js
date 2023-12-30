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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
const review_model_1 = require("./review.model");
const createReviewIntoDB = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const review = new review_model_1.Review(reviewData);
    const savedReview = yield review.save();
    return savedReview;
});
const getAllReviewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find().populate('courseId').populate({
        path: 'createdBy',
        select: '_id username email role',
    });
    return result;
});
const getSingleReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findById(id).populate('courseId').populate({
        path: 'createdBy',
        select: '_id username email role',
    });
    return result;
});
exports.ReviewServices = {
    createReviewIntoDB,
    getAllReviewsFromDB,
    getSingleReviewFromDB,
};
