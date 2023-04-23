import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({
    example: "jdlfgd9.dfgd1312.awdawfgbvbcb",
  })
  readonly userId: number;

  @ApiProperty({
    example: "Bad behavior",
  })
  readonly banReason: string;
}
