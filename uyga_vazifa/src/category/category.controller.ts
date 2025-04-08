import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Role } from "src/decorators/role.decorator";
import { Roles } from "src/Enums/user.role";
import { RoleGuard } from "src/auth/role.guard";
import { AuthGuard } from "src/auth/auth.guard";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

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

  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get()
  @CacheTTL(60)
  @ApiOperation({
    summary: "Barcha kategoriyalarni olish (filter, sort, pagination bilan)",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "sortBy", required: false, description: "Masalan: name" })
  @ApiQuery({
    name: "sortOrder",
    required: false,
    description: "asc yoki desc",
  })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "limit", required: false })
  findAll(
    @Query("search") search?: string,
    @Query("sortBy") sortBy?: string,
    @Query("sortOrder") sortOrder: "asc" | "desc" = "asc",
    @Query("page") page = "1",
    @Query("limit") limit = "10"
  ) {
    return this.categoryService.findAll({
      search,
      sortBy,
      sortOrder,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get(":id")
  @CacheTTL(60)
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
