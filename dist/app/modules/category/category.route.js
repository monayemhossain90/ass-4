"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const authType_1 = __importDefault(require("../../../middleware/authType"));
const user_constant_1 = require("../user/user.constant");
const category_controller_1 = require("./category.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (0, authType_1.default)(user_constant_1.USER_ROLE.admin), category_controller_1.categoryControllers.createCategory);
router.get('/', category_controller_1.categoryControllers.getCategories);
exports.CategoryRoutes = router;
