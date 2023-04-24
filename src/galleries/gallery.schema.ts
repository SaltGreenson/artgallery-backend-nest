import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.schema";
import { Photo } from "../photos/photo.shema";

export type GalleryDocument = HydratedDocument<Gallery>;

@Schema()
export class Gallery {
  @ApiProperty({ example: "awdjalk12.pomlk.lk23" })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({
    example: "Gallery title",
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: {},
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  user: User;

  @ApiProperty({
    example: {},
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Photo", required: true })
  photo: Photo;

  @ApiProperty({
    example: 0,
  })
  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  dislikes: number;

  @ApiProperty({
    example: Date.now(),
  })
  createdAt: Date;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
