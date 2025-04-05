import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryId } = createProductDto;

    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException("Category Topilmadi ");
    }

    const newProduct = await this.prisma.product.create({
      data: createProductDto,
    });

    return { data: newProduct };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException("Product Topilmadi");
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

    return { data: updatedProduct };
  }

  async remove(id: string) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException("Product Topilmadi");
    }

    let deleteProduct = await this.prisma.product.delete({ where: { id } });
    return { data: deleteProduct };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { Category: true },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return { data: product };
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        Category: true,
      },
    });
  }
}
