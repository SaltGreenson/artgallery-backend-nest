import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @ApiProperty({ example: "awdjalk12.pomlk.lk23" })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({ example: "ADMIN" })
  @Prop({ required: true })
  value: string;

  @ApiProperty({
    example: Date.now(),
  })
  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
