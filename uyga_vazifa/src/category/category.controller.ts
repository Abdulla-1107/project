import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Role } from "src/decorators/role.decorator";
import { Roles } from "src/Enums/user.role";
import { RoleGuard } from "src/auth/role.guard";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("Category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Role(Roles.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Kategoriyani yaratish" })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: "Kategoriya muvaffaqiyatli yaratildi",
  })
  @ApiResponse({ status: 400, description: "Yaratishda xatolik" })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha kategoriyalarni olish" })
  @ApiResponse({ status: 200, description: "Barcha kategoriyalar qaytarildi" })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi" })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta kategoriyani olish" })
  @ApiParam({ name: "id", description: "Kategoriya ID" })
  @ApiResponse({ status: 200, description: "Kategoriya topildi" })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi" })
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(id);
  }

  @Role(Roles.ADMIN, Roles.SUPERADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Kategoriya ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Yangilash uchun kategoriyaning ID raqami",
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: "Kategoriya yangilandi" })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Role(Roles.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Kategoriya o'chirish" })
  @ApiParam({ name: "id", description: "O'chiriladigan kategoriyaning ID" })
  @ApiResponse({ status: 200, description: "Kategoriya o'chirildi" })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi" })
  remove(@Param("id") id: string) {
    return this.categoryService.remove(id);
  }
}
