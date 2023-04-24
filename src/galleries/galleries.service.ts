import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Gallery } from "./gallery.schema";
import { Model } from "mongoose";
import { CreateGalleryDto } from "./dto/create-gallery.dto";
import { PhotosService } from "../photos/photos.service";
import { likeDislikeUpdateCriteriaHelper } from "./helpers/likeDislikeUpdateCriteria.helper";
import { UsersService } from "../users/users.service";
import { gallerySearchCriteriaHelper } from "./helpers/gallerySearchCriteria.helper";
import { LikeDislikeType } from "./types/LikeDislike.type";
import { GalleryGetAllType } from "./types/GalleryGetAll.type";
import { User } from "../users/user.schema";
import { GalleryGetOwnArtsType } from "./types/GalleryGetOwnArts.type";
import { VerifyHelper } from "../utils/verify-helper.service";
import { EditGalleryDto } from "./dto/edit-gallery.dto";

@Injectable()
export class GalleriesService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<Gallery>,
    private photoService: PhotosService,
    private usersService: UsersService,
    private verifyHelper: VerifyHelper
  ) {}

  private async likeDislike({
    userId,
    galleryId,
    variant,
  }: LikeDislikeType): Promise<User> {
    const updateCriteria = likeDislikeUpdateCriteriaHelper(variant, galleryId);
    const galleryCriteria = updateCriteria.galleryUpdateCriteria[variant];
    const userCriteria = updateCriteria.userUpdateCriteria[variant];
    const userLikedPosts = variant === "like" ? "likedPosts" : "dislikedPosts";

    let candidate = await this.usersService.findLikedDislikedPosts(
      userLikedPosts,
      userId,
      galleryId
    );

    if (candidate) {
      await this.galleryModel.updateOne(
        { _id: galleryId },
        galleryCriteria.exists
      );
      candidate = await this.usersService.updateUser(
        userId,
        userCriteria.exists,
        userLikedPosts
      );
    } else {
      await this.galleryModel.updateOne(
        { _id: galleryId },
        galleryCriteria.notExists
      );

      candidate = await this.usersService.updateUser(
        userId,
        userCriteria.notExists,
        userLikedPosts
      );
    }

    return candidate;
  }

  async getAll({
    skip,
    limit,
    userId,
    searchString,
    sortCriteria,
  }: GalleryGetAllType): Promise<Gallery[]> {
    const searchCriteria = gallerySearchCriteriaHelper(userId, searchString);
    return this.galleryModel
      .find({ ...searchCriteria })
      .sort({ ...sortCriteria })
      .skip(skip || 0)
      .limit(limit || 10)
      .populate({
        path: "user",
        select: "name",
        options: {
          match: { name: { $exists: true } },
        },
      })
      .populate({
        path: "photo",
        select: "originalUrl compressedUrl",
        options: {
          match: {
            originalUrl: { $exists: true },
            compressedUrl: { $exists: true },
          },
        },
      });
  }

  async like(galleryId: string, authHeader?: string): Promise<User> {
    const userData = this.verifyHelper.verifyAuthHeader(authHeader);

    return this.likeDislike({
      userId: userData._id,
      galleryId,
      variant: "like",
    });
  }

  async dislike(galleryId: string, authHeader?: string): Promise<User> {
    const userData = this.verifyHelper.verifyAuthHeader(authHeader);

    return this.likeDislike({
      userId: userData._id,
      galleryId,
      variant: "dislike",
    });
  }

  async create(
    dto: CreateGalleryDto,
    file: Express.Multer.File,
    authHeader?: string
  ) {
    const userData = this.verifyHelper.verifyAuthHeader(authHeader);

    const photo = await this.photoService.create(file);

    const gallery = await this.galleryModel.create({
      title: dto.title,
      photo: photo._id,
      user: userData._id,
    });

    const user = await this.usersService.incrementPostsCount(userData._id);
    return { galleryId: gallery._id, ...user };
  }

  remove = async (id: string, authHeader?: string) => {
    const userData = this.verifyHelper.verifyAuthHeader(authHeader);
    const deletedGallery = await this.galleryModel
      .findOneAndDelete({
        _id: id,
        user: userData._id,
      })
      .select("_id photo")
      .populate("photo")
      .lean();

    if (!deletedGallery) {
      throw new HttpException("Gallery not found", HttpStatus.BAD_REQUEST);
    }

    await this.photoService.remove(deletedGallery.photo._id);

    return this.usersService.decrementPostsCount(userData._id);
  };

  async getOwnArts({
    skip,
    limit,
    searchString,
    sortCriteria,
    authHeader,
  }: GalleryGetOwnArtsType) {
    const userData = this.verifyHelper.verifyAuthHeader(authHeader);
    return this.getAll({
      userId: userData._id as unknown as string,
      sortCriteria,
      searchString,
      skip,
      limit,
    });
  }

  async getById(galleryId: string) {
    return this.galleryModel
      .findById({ _id: galleryId })
      .populate({
        path: "user",
        select: "name _id",
      })
      .populate({
        path: "photo",
        select: "originalUrl compressedUrl _id",
      });
  }

  async edit(dto: EditGalleryDto, authHeader?: string) {
    const userData = this.verifyHelper.verifyAuthHeader(authHeader);

    const candidate = await this.galleryModel
      .findOneAndUpdate(
        {
          _id: dto.galleryId,
          user: userData._id,
        },
        { title: dto.title },
        { new: true }
      )
      .select("_id");

    if (!candidate) {
      throw new HttpException(
        "Gallery not found",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return candidate;
  }
}
