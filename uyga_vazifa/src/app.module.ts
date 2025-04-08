import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/product.module";
import { CategoryModule } from "./category/category.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-ioredis";

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    UserModule,
    PrismaModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 60,
      store: redisStore,
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
