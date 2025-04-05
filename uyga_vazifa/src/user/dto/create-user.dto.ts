import { IsEmail, IsEnum, IsString } from "class-validator";
import { Roles } from "src/Enums/user.role";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "Abdulla" })
  @IsString()
  name: string;

  @ApiProperty({ example: "strongPassword123" })
  @IsString()
  password: string;

  @ApiProperty({ example: "abdulla@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ enum: Roles, example: Roles.USER })
  @IsEnum(Roles)
  role: Roles;
}
