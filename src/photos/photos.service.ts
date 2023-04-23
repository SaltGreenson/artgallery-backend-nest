import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Photo } from "./photo.shema";
import { Storage } from "@google-cloud/storage";

import StorageConfig from "./storage-config";
import * as crypto from "crypto";
import * as sharp from "sharp";

@Injectable()
export class PhotosService {
  private storage: Storage;
  constructor(@InjectModel(Photo.name) private photoModel: Model<Photo>) {
    this.storage = new Storage({
      keyFilename: StorageConfig.keyFilename,
      projectId: StorageConfig.projectId,
    });
  }

  private async saveFile(
    buffer: Buffer
  ): Promise<{ url: string; name: string }> {
    const bucket = await this.storage.bucket(StorageConfig.bucketName);
    const destination = `${crypto
      .randomBytes(20)
      .toString("hex")}_${Date.now()}.jpeg`;
    await bucket.file(destination).save(buffer);
    return {
      name: destination,
      url: (await bucket.file(destination).getMetadata())[0].mediaLink,
    };
  }

  private async deleteFile(fileName: string) {
    const bucket = await this.storage.bucket(StorageConfig.bucketName);
    const file = bucket.file(fileName);
    return file.delete();
  }

  private async compressImage(file: Express.Multer.File) {
    const options = {
      quality: 80,
      progressive: true,
    };

    return sharp(file.buffer).jpeg(options).toBuffer();
  }

  async getByPhotoId(photoId: mongoose.Types.ObjectId) {
    return this.photoModel.findById(photoId);
  }

  async remove(imageId: mongoose.Types.ObjectId) {
    const imageData = await this.getByPhotoId(imageId);

    if (!imageData) {
      throw new HttpException(
        "Image not found",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    await this.deleteFile(imageData.originalName);
    await this.deleteFile(imageData.compressedName);

    return this.photoModel.deleteOne({
      _id: imageData._id,
    });
  }

  async create(file: Express.Multer.File) {
    const compressedImage = await this.compressImage(file);
    const originalImageData = await this.saveFile(file.buffer);
    const compressedImageData = await this.saveFile(compressedImage);

    return this.photoModel.create({
      compressedName: compressedImageData.name,
      compressedUrl: compressedImageData.url,
      originalName: originalImageData.name,
      originalUrl: originalImageData.url,
    });
  }
}
