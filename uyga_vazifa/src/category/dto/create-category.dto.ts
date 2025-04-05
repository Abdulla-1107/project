import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Kategoriyaning nomi',
    type: String,
  })
  name: string;
}
