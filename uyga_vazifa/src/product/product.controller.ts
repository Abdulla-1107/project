import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/role.guard";
import { Role } from "src/decorators/role.decorator";
import { Roles } from "src/Enums/user.role";

@ApiTags("Product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Role(Roles.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Mahsulot yaratish" })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: "Mahsulot yaratildi" })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha mahsulotlarni olish" })
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Bitta mahsulotni olish" })
  @ApiParam({ name: "id", description: "Mahsulot ID" })
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }

  @Role(Roles.ADMIN, Roles.SUPERADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Mahsulotni yangilash" })
  @ApiParam({ name: "id", description: "Mahsulot ID" })
  @ApiBody({ type: UpdateProductDto })
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Role(Roles.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Mahsulotni o'chirish" })
  @ApiParam({ name: "id", description: "Mahsulot ID" })
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }
}
