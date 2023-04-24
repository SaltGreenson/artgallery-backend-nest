import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { VerifyHelper } from "../utils/verify-helper.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private rolesService: RolesService,
    private verifyHelper: VerifyHelper
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const role = await this.rolesService.create({
      value: "GUEST",
    });

    return (
      await this.userModel.create({
        ...dto,
        role,
      })
    ).populate({
      path: "role",
      select: "value",
    });
  }

  async getUserById(_id: string): Promise<User> {
    return this.userModel.findById({ _id }).populate({
      path: "likedPosts dislikedPosts",
      select: "_id",
    });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel
      .findById({ _id: dto.userId })
      .select("role")
      .populate({
        path: "role",
        select: "value",
      });
    const role = await this.rolesService.create({
      value: dto.value.toUpperCase(),
    });

    if (role && user) {
      await user.$set("role", role._id);
      await user.save();
      return dto;
    }

    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userModel
      .findById({ _id: dto.userId })
      .select("banned bannedReason role")
      .populate({
        path: "role",
        select: "value",
      });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    if (user.role.value === "ADMIN") {
      throw new HttpException("Access denied", HttpStatus.FORBIDDEN);
    }

    user.$set("banned", true);
    user.$set("bannedReason", dto.banReason);
    return user.save();
  }

  async getUserByEmailOrName(email: string, name = undefined): Promise<User> {
    return this.userModel.findOne({ $or: [{ email }, { name }] }).populate({
      path: "role",
      select: "value",
    });
  }

  async findLikedDislikedPosts(
    type: "likedPosts" | "dislikedPosts",
    userId: mongoose.Types.ObjectId,
    galleryId: string
  ): Promise<User> {
    return this.userModel
      .findOne({
        _id: userId,
        [type]: galleryId,
      })
      .select("_id");
  }

  async updateUser(
    userId: mongoose.Types.ObjectId,
    updateCriteria,
    populatePath: "likedPosts" | "dislikedPosts"
  ) {
    return this.userModel
      .findOneAndUpdate(
        {
          _id: userId,
        },
        { ...updateCriteria },
        { new: true }
      )
      .select("_id name")
      .populate({
        path: populatePath,
        select: "_id",
      })
      .lean();
  }

  async incrementPostsCount(userId: mongoose.Types.ObjectId): Promise<User> {
    return this.userModel
      .findOneAndUpdate(
        { _id: userId },
        { $inc: { postsCount: 1 } },
        { new: true }
      )
      .select("postsCount")
      .lean();
  }

  async decrementPostsCount(userId: mongoose.Types.ObjectId): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate(
        { _id: userId },
        { $inc: { postsCount: -1 } },
        { new: true }
      )
      .select("postsCount likedPosts dislikedPosts")
      .populate({
        path: "likedPosts dislikedPosts",
        select: "_id",
      })
      .lean();

    if (!user) {
      throw new HttpException(
        "User not found",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          likedCount: user.likedPosts.length,
          dislikedCount: user.dislikedPosts.length,
        },
      },
      { new: true }
    );
  }

  async findAll(
    searchString: string,
    skip: number,
    limit: number
  ): Promise<User[]> {
    return this.userModel
      .find({
        name: { $regex: searchString },
      })
      .skip(skip)
      .limit(limit)
      .populate("role");
  }

  async getLiked(skip: number, limit: number, authHeader?: string) {
    const userData = this.verifyHelper.verifyAuthHeader(authHeader);

    return this.userModel
      .findById({ _id: userData._id })
      .select("name likedPosts")
      .populate({
        path: "likedPosts",
        populate: {
          path: "user photo",
          select: "name compressedUrl originalUrl",
        },
        options: { skip: skip ?? 0, limit: limit ?? 10 },
      });
  }
}
