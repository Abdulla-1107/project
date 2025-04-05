import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        data: {
            id: string;
            name: string;
            password: string;
            email: string;
            role: string;
        };
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        data: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        password: string;
        email: string;
        role: string;
    }[]>;
}
