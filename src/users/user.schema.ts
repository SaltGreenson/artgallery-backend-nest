import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Gallery } from "../galleries/gallery.schema";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
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
    example: Date.now(),
  })
  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
