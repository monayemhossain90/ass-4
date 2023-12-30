"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const review_validation_1 = require("./review.validation");
const authType_1 = __importDefault(require("../../../middleware/authType"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/', (0, authType_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(review_validation_1.reviewValidation.reviewValidationSchema), review_controller_1.reviewControllers.createReview);
router.get('/', review_controller_1.reviewControllers.getAllReviews);
router.get('/:id', review_controller_1.reviewControllers.getSingleReviews);
exports.reviewsRoutes = router;
