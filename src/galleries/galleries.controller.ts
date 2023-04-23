import { Body, Controller, Post, UploadedFile } from "@nestjs/common";
import { GalleriesService } from "./galleries.service";
import { CreateGalleryDto } from "./dto/create-gallery.dto";

@Controller("galleries")
export class GalleriesController {
  constructor(private galleriesService: GalleriesService) {}

  @Post()
  create(@Body() dto: CreateGalleryDto, @UploadedFile() image) {
    //   TODO: create
  }
}
