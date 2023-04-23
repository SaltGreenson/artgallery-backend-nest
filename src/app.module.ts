import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { AuthModule } from "./auth/auth.module";
import { GalleriesModule } from "./galleries/galleries.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    UsersModule,
    RolesModule,
    AuthModule,
    GalleriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
