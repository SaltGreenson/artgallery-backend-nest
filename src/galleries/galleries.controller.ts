import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { GalleriesService } from "./galleries.service";
import { CreateGalleryDto } from "./dto/create-gallery.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { SwaggerCreateGallery } from "./swagger.decorator";
import { Express } from "express";

@ApiTags("Galleries")
@Controller("/api/galleries")
export class GalleriesController {
  constructor(private galleriesService: GalleriesService) {}

  @SwaggerCreateGallery()
  @Post("/create")
  @UseInterceptors(FileInterceptor("photo[]"))
  create(
    @Body() dto: CreateGalleryDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    //   TODO: create
    console.log(image);
    return;
  }
}
