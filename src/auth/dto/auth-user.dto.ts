import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDto {
  @ApiProperty({
    example: "alex@gmail.com",
  })
  readonly email: string;

  @ApiProperty({
    example: "12345",
  })
  readonly password: string;
}
