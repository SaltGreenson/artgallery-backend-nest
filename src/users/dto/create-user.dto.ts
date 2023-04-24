import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "alex@gmail.com",
  })
  @Length(3, 30, {
    message: "Email must be less than 30 and more than 3 symbols",
  })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string;

  @ApiProperty({
    example: "12345",
  })
  @Length(3, 20, {
    message: "Password must be less than 20 and more than 3 symbols",
  })
  readonly password: string;

  @ApiProperty({
    example: "Alex",
  })
  @Length(2, 20, {
    message: "Name must be less than 20 and more than 2 symbols",
  })
  readonly name: string;
}
