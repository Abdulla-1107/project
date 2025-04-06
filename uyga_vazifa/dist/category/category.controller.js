"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const swagger_1 = require("@nestjs/swagger");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const role_decorator_1 = require("../decorators/role.decorator");
const user_role_1 = require("../Enums/user.role");
const role_guard_1 = require("../auth/role.guard");
const auth_guard_1 = require("../auth/auth.guard");
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    create(createCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
    findAll() {
        return this.categoryService.findAll();
    }
    findOne(id) {
        return this.categoryService.findOne(id);
    }
    update(id, updateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }
    remove(id) {
        return this.categoryService.remove(id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, role_decorator_1.Role)(user_role_1.Roles.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Kategoriyani yaratish" }),
    (0, swagger_1.ApiBody)({ type: create_category_dto_1.CreateCategoryDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Kategoriya muvaffaqiyatli yaratildi",
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Yaratishda xatolik" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Barcha kategoriyalarni olish" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Barcha kategoriyalar qaytarildi" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Kategoriya topilmadi" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Bitta kategoriyani olish" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Kategoriya ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Kategoriya topildi" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Kategoriya topilmadi" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, role_decorator_1.Role)(user_role_1.Roles.ADMIN, user_role_1.Roles.SUPERADMIN),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Kategoriya ma'lumotlarini yangilash" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Yangilash uchun kategoriyaning ID raqami",
    }),
    (0, swagger_1.ApiBody)({ type: update_category_dto_1.UpdateCategoryDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Kategoriya yangilandi" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Kategoriya topilmadi" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "update", null);
__decorate([
    (0, role_decorator_1.Role)(user_role_1.Roles.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Kategoriya o'chirish" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "O'chiriladigan kategoriyaning ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Kategoriya o'chirildi" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Kategoriya topilmadi" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)("Category"),
    (0, common_1.Controller)("category"),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map