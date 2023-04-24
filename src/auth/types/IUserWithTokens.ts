import { CreatedUserDto } from "../dto/created-user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class IUserWithTokens {
  @ApiProperty({
    example: "awtdkalwjlkuoipsgkls.sdufiseiofhjsdfesuiesfsefsk",
  })
  readonly accessToken: string;

  @ApiProperty({
    example: "awtdkalwjlkuoipsgkls.sdufiseiofhjsdfesuiesfsefsk",
  })
  readonly refreshToken: string;

  @ApiProperty({
    example: {},
  })
  readonly user: CreatedUserDto;
}
