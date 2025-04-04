import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import IProduct from './product-dto/dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  FindAll(
    @Query() query: { limit: string; offset: string; sort?: string; order?: string }
  ) {
    return this.productService.FindAll(query);
  }  
  @Get(':id')
  FindOne(@Param('id') id: string) {
    return this.productService.FindOne(+id);
  }
  @Post()
  Create(@Body() product: Omit<IProduct, 'id'>) {
    return this.productService.Create(product);
  }
  @Patch(':id')
  Update(@Param('id') id: string, @Body() product: Partial<IProduct>) {
    return this.productService.Update(+id, product);
  }
  @Delete(":id")
  Remove(@Param('id') id: string){
    return this.productService.Remove(+id)
  }
}
