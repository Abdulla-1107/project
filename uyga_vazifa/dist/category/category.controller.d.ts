import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        data: {
            id: string;
            name: string;
        };
    }>;
    findAll(search?: string, sortBy?: string, sortOrder?: "asc" | "desc", page?: string, limit?: string): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
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
        })[];
    }>;
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
