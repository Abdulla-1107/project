import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        data: {
            id: string;
            name: string;
        };
    }>;
    findAll(): Promise<({
        Product: {
            id: string;
            name: string;
            color: string;
            price: number;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
    })[]>;
    findOne(id: string): Promise<{
        data: {
            Product: {
                id: string;
                name: string;
                color: string;
                price: number;
                categoryId: string;
            }[];
        } & {
            id: string;
            name: string;
        };
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        data: {
            id: string;
            name: string;
        };
    }>;
    remove(id: string): Promise<{
        data: {
            id: string;
            name: string;
        };
    }>;
}
