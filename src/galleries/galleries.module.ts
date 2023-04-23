import { Module } from "@nestjs/common";
import { GalleriesController } from "./galleries.controller";
import { GalleriesService } from "./galleries.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PhotosModule } from "../photos/photos.module";
import { Gallery, GallerySchema } from "./gallery.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
    PhotosModule,
  ],
  controllers: [GalleriesController],
  providers: [GalleriesService],
})
export class GalleriesModule {}
