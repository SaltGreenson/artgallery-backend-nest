import { Module } from "@nestjs/common";
import { GalleriesController } from "./galleries.controller";
import { GalleriesService } from "./galleries.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PhotosModule } from "../photos/photos.module";
import { Gallery, GallerySchema } from "./gallery.schema";
import { UsersModule } from "../users/users.module";
import { VerifyHelper } from "../utils/verify-helper.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
    PhotosModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [GalleriesController],
  providers: [GalleriesService, VerifyHelper],
})
export class GalleriesModule {}
