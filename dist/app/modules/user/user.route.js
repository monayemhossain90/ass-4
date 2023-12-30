"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_validation_1 = require("./user.validation");
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const admin_validation_1 = require("../admin/admin.validation");
// import authType from '../../../middleware/authType';
// import { USER_ROLE } from './user.constant';
const router = express_1.default.Router();
router.post('/create-user', 
// authType(USER_ROLE.admin, USER_ROLE.user),
(0, validateRequest_1.default)(user_validation_1.UserValidation.CreateuserValidationSchema), user_controller_1.UserControllers.createUser);
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.adminValidation.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
exports.userRoutes = router;
