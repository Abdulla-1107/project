import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<{
        data: {
            name: string;
            color: string;
            price: number;
            categoryId: string;
            id: string;
        };
    }>;
    findAll(search?: string, categoryId?: string, sortBy?: string, sortOrder?: "asc" | "desc", page?: string, limit?: string): Promise<{
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
}
