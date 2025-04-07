import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        data: {
            name: string;
            color: string;
            price: number;
            categoryId: string;
            id: string;
        };
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        data: {
            name: string;
            color: string;
            price: number;
            categoryId: string;
            id: string;
        };
    }>;
    remove(id: string): Promise<{
        data: {
            name: string;
            color: string;
            price: number;
            categoryId: string;
            id: string;
        };
    }>;
    findOne(id: string): Promise<{
        data: {
            Category: {
                name: string;
                id: string;
            };
        } & {
            name: string;
            color: string;
            price: number;
            categoryId: string;
            id: string;
        };
    }>;
    findAll(query: {
        search?: string;
        categoryId?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
        page: number;
        limit: number;
    }): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            Category: {
                name: string;
                id: string;
            };
        } & {
            name: string;
            color: string;
            price: number;
            categoryId: string;
            id: string;
        })[];
    }>;
}
