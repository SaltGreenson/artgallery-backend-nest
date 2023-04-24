import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.schema";

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @ApiProperty({ example: "awdjalk12.pomlk.lk23" })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({ example: {} })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  user: User;

  @ApiProperty({ example: "12312.awda2342.awda" })
  @Prop({ required: true })
  refreshToken: string;

  @ApiProperty({
    example: Date.now(),
  })
  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
