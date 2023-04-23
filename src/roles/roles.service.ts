import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "./role.schema";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private rolesModel: Model<Role>) {}

  async findAll(): Promise<Role[]> {
    return [
      {
        _id: "123123123",
        description: "Adi",
        value: "Administrator",
        createdAt: Date.now() as unknown as Date,
      },
    ];
  }
}
