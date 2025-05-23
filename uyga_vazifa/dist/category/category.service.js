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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoryService = class CategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        let name = await this.prisma.category.findFirst({
            where: { name: createCategoryDto.name },
        });
        if (name) {
            throw new common_1.ConflictException("Bunday Category Mavjud");
        }
        let category = await this.prisma.category.create({
            data: createCategoryDto,
        });
        return { data: category };
    }
    async findAll(query) {
        const { search, sortBy, sortOrder, page, limit } = query;
        const where = {};
        if (search) {
            where.name = {
                contains: search,
                mode: "insensitive",
            };
        }
        const orderBy = sortBy
            ? {
                [sortBy]: sortOrder || "asc",
            }
            : undefined;
        const total = await this.prisma.category.count({ where });
        const categories = await this.prisma.category.findMany({
            where,
            orderBy,
            skip: (page - 1) * limit,
            take: limit,
            include: {
                Product: true,
            },
        });
        return {
            total,
            page,
            limit,
            data: categories,
        };
    }
    async findOne(id) {
        let category = await this.prisma.category.findFirst({
            where: { id },
            include: {
                Product: true,
            },
        });
        if (!category) {
            throw new common_1.NotFoundException("Category Topilmadi");
        }
        return { data: category };
    }
    async update(id, updateCategoryDto) {
        let category = await this.prisma.category.findFirst({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException("Category Topilmadi");
        }
        let updateCategory = await this.prisma.category.update({
            where: { id },
            data: updateCategoryDto,
        });
        return { data: updateCategory };
    }
    async remove(id) {
        let category = await this.prisma.category.findFirst({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException("Category Topilmadi");
        }
        let categoryDelete = await this.prisma.category.delete({ where: { id } });
        return { data: categoryDelete };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map