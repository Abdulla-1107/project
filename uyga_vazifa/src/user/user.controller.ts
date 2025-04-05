import { Controller, Post, Body, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @ApiOperation({ summary: "Foydalanuvchini ro'yxatdan o'tkazish" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "Foydalanuvchi yaratildi" })
  @ApiResponse({
    status: 400,
    description: "Email allaqachon ro'yxatdan o'tgan",
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Foydalanuvchi tizimga kiradi" })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: "Foydalanuvchi muvaffaqiyatli tizimga kirdi" })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha foydalanuvchilarni olish" })
  @ApiResponse({ status: 200, description: "Barcha foydalanuvchilar qaytarildi" })
  findAll() {
    return this.userService.findAll();
  }
}
