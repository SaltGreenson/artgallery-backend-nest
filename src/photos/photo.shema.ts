import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type PhotoDocument = HydratedDocument<Photo>;

@Schema()
export class Photo {
  @ApiProperty({ example: "awdjalk12.pomlk.lk23" })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({
    example: "https://example.com/image.jpeg",
  })
  @Prop({ required: true, unique: true })
  originalUrl: string;

  @ApiProperty({
    example: "original_photo",
  })
  @Prop({ required: true, unique: true })
  originalName: string;

  @ApiProperty({
    example: "https://example.com/image.jpeg",
  })
  @Prop({ required: true, unique: true })
  compressedUrl: string;

  @ApiProperty({
    example: "compressed_photo",
  })
  @Prop({ required: true, unique: true })
  compressedName: string;

  @ApiProperty({
    example: Date.now(),
  })
  createdAt: Date;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
