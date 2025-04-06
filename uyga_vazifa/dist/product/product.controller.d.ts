import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<{
        data: {
            id: string;
            name: string;
            color: string;
            price: number;
            categoryId: string;
        };
    }>;
    findAll(): Promise<({
        Category: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        color: string;
        price: number;
        categoryId: string;
    })[]>;
    findOne(id: string): Promise<{
        data: {
            Category: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            color: string;
            price: number;
            categoryId: string;
        };
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        data: {
            id: string;
            name: string;
            color: string;
            price: number;
            categoryId: string;
        };
    }>;
    remove(id: string): Promise<{
        data: {
            id: string;
            name: string;
            color: string;
            price: number;
            categoryId: string;
        };
    }>;
}
