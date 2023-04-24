import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { VerifyHelper } from "../utils/verify-helper.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, VerifyHelper],
  exports: [UsersService],
})
export class UsersModule {}
