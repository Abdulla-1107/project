import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        data: {
            name: string;
            id: string;
        };
    }>;
    findAll(query: {
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
        page: number;
        limit: number;
    }): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            Product: {
                name: string;
                color: string;
                price: number;
                categoryId: string;
                id: string;
            }[];
        } & {
            name: string;
            id: string;
        })[];
    }>;
    findOne(id: string): Promise<{
        data: {
            Product: {
                name: string;
                color: string;
                price: number;
                categoryId: string;
                id: string;
            }[];
        } & {
            name: string;
            id: string;
        };
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        data: {
            name: string;
            id: string;
        };
    }>;
    remove(id: string): Promise<{
        data: {
            name: string;
            id: string;
        };
    }>;
}
