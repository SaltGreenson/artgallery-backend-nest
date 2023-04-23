import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @ApiProperty({ example: "jh3242kjadawl1kj23gv112we1" })
  @Prop()
  _id: string;

  @ApiProperty({ example: "ADMIN" })
  @Prop({ required: true })
  value: string;

  @ApiProperty({
    example: "Administrator",
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: Date.now(),
  })
  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
