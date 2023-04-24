import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({
    example: "admin",
  })
  readonly value: string;

  @ApiProperty({
    example: "awydhajkwd1.awd.12.awdawdipogpokdl",
  })
  readonly userId: string;
}
