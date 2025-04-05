import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/Enums/user.role';

export const ROLES_KEY = 'roles';
export const Role = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);