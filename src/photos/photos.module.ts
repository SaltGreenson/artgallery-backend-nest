import { Module } from "@nestjs/common";
import { PhotosService } from "./photos.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Photo, PhotoSchema } from "./photo.shema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
  ],
  providers: [PhotosService],
  exports: [PhotosService],
})
export class PhotosModule {}
