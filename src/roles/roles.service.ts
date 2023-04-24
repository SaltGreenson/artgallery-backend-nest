import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "./role.schema";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private rolesModel: Model<Role>) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    return this.rolesModel
      .findOneAndUpdate({ value: dto.value }, {}, { upsert: true, new: true })
      .select("_id value")
      .lean();
  }

  async getByValue(value: string): Promise<Role> {
    return this.rolesModel.findOne({ value }).select("_id value");
  }

  async findAll(
    searchString: string,
    skip: number,
    limit: number
  ): Promise<Role[]> {
    return [];
  }
}
