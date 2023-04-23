import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Gallery } from "./gallery.schema";
import { Model } from "mongoose";
import { CreateGalleryDto } from "./dto/create-gallery.dto";
import { PhotosService } from "../photos/photos.service";

@Injectable()
export class GalleriesService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<Gallery>,
    private photoService: PhotosService
  ) {}

  async create(dto: CreateGalleryDto, image: any) {
    //   TODO: create
  }
}
