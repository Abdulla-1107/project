import { Roles } from 'src/Enums/user.role';
export declare const ROLES_KEY = "roles";
export declare const Role: (...roles: Roles[]) => import("@nestjs/common").CustomDecorator<string>;
