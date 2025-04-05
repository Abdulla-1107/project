import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Foydalanuvchining email manzili',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Foydalanuvchining paroli',
    type: String,
  })
  password: string;
}
