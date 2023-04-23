import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreatedUserDto } from "../auth/dto/created-user.dto";

@Injectable()
export class VerifyHelper {
  constructor(private jwtService: JwtService) {}

  verifyAuthHeader(authHeader?: string): CreatedUserDto {
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      throw new Error();
    }

    return this.jwtService.verify(token);
  }
}
