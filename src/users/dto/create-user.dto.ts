import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "alex@gmail.com",
  })
  readonly email: string;

  @ApiProperty({
    example: "12345",
  })
  readonly password: string;

  @ApiProperty({
    example: "Alex",
  })
  readonly name: string;
}
