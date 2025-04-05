import { Roles } from "src/Enums/user.role";
export declare class CreateUserDto {
    name: string;
    password: string;
    email: string;
    role: Roles;
}
