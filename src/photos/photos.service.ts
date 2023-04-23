import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Photo } from "./photo.shema";

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Photo.name) private photoModel: Model<Photo>) {}
}
