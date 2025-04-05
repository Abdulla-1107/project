import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Mahsulot nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Mahsulot rangi' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ description: 'Mahsulot narxi' })
  @IsInt()
  price: number;

  @ApiProperty({ description: 'Kategoriya ID si' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
