"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const authType_1 = __importDefault(require("../../../middleware/authType"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.registerValidationSchema), auth_controller_1.AuthControllers.register);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.post('/change-password', (0, authType_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), auth_controller_1.AuthControllers.changePassword);
router.post('/refresh-token', auth_controller_1.AuthControllers.refreshToken);
exports.AuthRoutes = router;
