import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type GalleryDocument = HydratedDocument<Gallery>;

@Schema()
export class Gallery {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
