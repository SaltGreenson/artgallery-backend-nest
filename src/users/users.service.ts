import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private rolesService: RolesService
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
      path: "role",
      select: "value",
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

    await user.$set("banned", true);
    await user.$set("bannedReason", dto.banReason);
    return user.save();
  }

  async getUserByEmailOrName(email: string, name = undefined): Promise<User> {
    return this.userModel.findOne({ $or: [{ email }, { name }] }).populate({
      path: "role",
      select: "value",
    });
  }

  async findAll(
    searchString: string,
    skip: number,
    limit: number
  ): Promise<User[]> {
    console.log(searchString, skip, limit);
    return this.userModel.find().populate("role");
  }
}
