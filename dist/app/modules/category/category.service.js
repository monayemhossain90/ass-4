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
exports.CategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errorHandle/appError"));
const category_model_1 = require("./category.model");
const createcategoryIntoDB = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.create(categoryData);
    return result;
});
const getAllCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.Category.find({}, { _id: 1, name: 1, });
        return categories;
    }
    catch (error) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Error Retrieving categories from the database');
    }
});
exports.CategoryServices = {
    createcategoryIntoDB,
    getAllCategoriesFromDB,
};
