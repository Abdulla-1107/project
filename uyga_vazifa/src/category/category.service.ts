import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    let name = await this.prisma.category.findFirst({
      where: { name: createCategoryDto.name },
    });
    if (name) {
      throw new ConflictException("Bunday Category Mavjud");
    }
    let category = await this.prisma.category.create({
      data: createCategoryDto,
    });
    return { data: category };
  }

  async findAll() {
    return await this.prisma.category.findMany({
      include: {
        Product: true,
      },
    });
  }

  async findOne(id: string) {
    let category = await this.prisma.category.findFirst({
      where: { id },
      include: {
        Product: true,
      },
    });
    if (!category) {
      throw new NotFoundException("Category Topilmadi");
    }
    return { data: category };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let category = await this.prisma.category.findFirst({ where: { id } });
    if (!category) {
      throw new NotFoundException("Category Topilmadi");
    }

    let updateCategory = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });

    return { data: updateCategory };
  }

  async remove(id: string) {
    let category = await this.prisma.category.findFirst({ where: { id } });
    if (!category) {
      throw new NotFoundException("Category Topilmadi");
    }
    let categoryDelete = await this.prisma.category.delete({ where: { id } });
    return { data: categoryDelete };
  }
}
