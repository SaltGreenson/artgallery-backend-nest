import { Module } from "@nestjs/common";
import { GalleriesController } from "./galleries.controller";
import { GalleriesService } from "./galleries.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PhotosModule } from "../photos/photos.module";
import { Gallery, GallerySchema } from "./gallery.schema";
import { UsersModule } from "../users/users.module";
import { JwtService } from "@nestjs/jwt";
import { VerifyHelper } from "../utils/verify-helper.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
    PhotosModule,
    UsersModule,
  ],
  controllers: [GalleriesController],
  providers: [GalleriesService, VerifyHelper, JwtService],
})
export class GalleriesModule {}
