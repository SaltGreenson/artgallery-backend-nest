import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Gallery } from "../galleries/gallery.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/role.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({ example: "awdjalk12.pomlk.lk23" })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({ example: "Alex" })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: "alex@gmail.com",
    description: "Unique email address",
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: "12345",
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: 0,
  })
  @Prop({ default: 0 })
  likedCount: number;

  @ApiProperty({
    example: 0,
  })
  @Prop({ default: 0 })
  dislikedCount: number;

  @ApiProperty({
    example: 0,
  })
  @Prop({ default: 0 })
  postsCount: number;

  @ApiProperty({
    example: [],
  })
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Gallery" }])
  likedPosts: Gallery[];

  @ApiProperty({
    example: [],
  })
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Gallery" }])
  dislikedPosts: Gallery[];

  @ApiProperty({
    example: "ADMIN",
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role" })
  role: Role;

  @ApiProperty({
    example: false,
  })
  @Prop({ default: false })
  banned: boolean;

  @ApiProperty({
    example: "",
  })
  @Prop({ default: "" })
  bannedReason: string;

  @ApiProperty({
    example: Date.now(),
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
