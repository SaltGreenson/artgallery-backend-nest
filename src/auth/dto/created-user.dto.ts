import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../roles/role.schema";
import { Gallery } from "../../galleries/gallery.schema";
import { User } from "../../users/user.schema";
import mongoose from "mongoose";

export class CreatedUserDto {
  @ApiProperty({
    example: "sfs78612lkjadw872129.lk1231",
  })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({
    example: "alex@gmail.com",
  })
  email: string;

  @ApiProperty({
    example: "Alex",
  })
  name: string;

  @ApiProperty({
    example: {},
  })
  role = {} as Role;

  @ApiProperty({
    example: 0,
  })
  likedCount: number;

  @ApiProperty({
    example: 0,
  })
  dislikedCount: number;

  @ApiProperty({
    example: 0,
  })
  postsCount: number;

  @ApiProperty({
    example: [],
  })
  likedPosts: Gallery[];

  @ApiProperty({
    example: [],
  })
  dislikedPosts: Gallery[];

  constructor(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.role.value = user.role.value;
    this.role._id = user.role._id;
    this.likedCount = user.likedCount;
    this.likedPosts = user.likedPosts;
    this.dislikedCount = user.dislikedCount;
    this.dislikedPosts = user.dislikedPosts;
    this.postsCount = user.postsCount;
  }
}
