"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        const { email, password } = createUserDto;
        let user = await this.prisma.user.findFirst({ where: { email } });
        if (user) {
            throw new common_1.BadRequestException("Email allaqachon ro'yxatdan o'tilgan");
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
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        let user = await this.prisma.user.findFirst({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException("User Topilmadi");
        }
        let match = bcrypt.compareSync(password, user.password);
        if (!match) {
            throw new common_1.BadRequestException("User Topilmadi");
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map