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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        const { categoryId } = createProductDto;
        const category = await this.prisma.category.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException("Category Topilmadi ");
        }
        const newProduct = await this.prisma.product.create({
            data: createProductDto,
        });
        return { data: newProduct };
    }
    async update(id, updateProductDto) {
        const existingProduct = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!existingProduct) {
            throw new common_1.NotFoundException("Product Topilmadi");
        }
        const updatedProduct = await this.prisma.product.update({
            where: { id },
            data: updateProductDto,
        });
        return { data: updatedProduct };
    }
    async remove(id) {
        const existingProduct = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!existingProduct) {
            throw new common_1.NotFoundException("Product Topilmadi");
        }
        let deleteProduct = await this.prisma.product.delete({ where: { id } });
        return { data: deleteProduct };
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { Category: true },
        });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        return { data: product };
    }
    async findAll(query) {
        const { search, categoryId, sortBy, sortOrder, page, limit } = query;
        const where = {};
        if (search) {
            where.name = {
                contains: search,
                mode: "insensitive",
            };
        }
        if (categoryId) {
            where.categoryId = categoryId;
        }
        const orderBy = sortBy
            ? {
                [sortBy]: sortOrder || "asc",
            }
            : undefined;
        const total = await this.prisma.product.count({ where });
        const products = await this.prisma.product.findMany({
            where,
            orderBy,
            skip: (page - 1) * limit,
            take: limit,
            include: {
                Category: true,
            },
        });
        return {
            total,
            page,
            limit,
            data: products,
        };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map