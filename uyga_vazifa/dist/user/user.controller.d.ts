import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
