import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth, AuthSchema } from "./auth.shema";
import { VerifyHelper } from "../helpers/verify-helper.service";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET || "SECRET",
    }),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  providers: [AuthService, VerifyHelper],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, VerifyHelper],
})
export class AuthModule {}
