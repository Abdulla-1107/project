import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}
  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    let user = await this.prisma.user.findFirst({ where: { email } });
    if (user) {
      throw new BadRequestException("Email allaqachon ro'yxatdan o'tilgan");
    }
    let hash = bcrypt.hashSync(password, 10);
    let newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hash,
      },
    });

    return { data: newUser };
  }
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    let user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException("User Topilmadi");
    }
    let match = bcrypt.compareSync(password, user.password);
    if (!match) {
      throw new BadRequestException("User Topilmadi");
    }
    let token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { data: token };
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }
}
