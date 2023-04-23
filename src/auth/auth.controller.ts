import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import {
  SwaggerLogIn,
  SwaggerLogout,
  SwaggerRefresh,
  SwaggerSignUp,
} from "./swagger.decorator";
import { AuthUserDto } from "./dto/auth-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ValidationPipe } from "../pipes/validation.pipe";
import { FastifyRequest, FastifyReply } from "fastify";

@ApiTags("Auth")
@Controller("/api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @SwaggerLogIn()
  @Post("/log-in")
  async login(@Body() userDto: AuthUserDto, @Res() res: FastifyReply) {
    const user = await this.authService.login(userDto);
    this.setCookie(res, user.accessToken, user.refreshToken);
    return res.send(user);
  }

  @SwaggerLogout()
  @UseGuards(JwtAuthGuard)
  @Delete("/logout")
  async logout(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const { refreshToken } = req.cookies;
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.send(this.authService.logout(refreshToken));
  }

  @SwaggerRefresh()
  @UseGuards(JwtAuthGuard)
  @Put("/refresh")
  async refresh(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const { refreshToken } = req.cookies;
    const user = await this.authService.refresh(refreshToken);
    this.setCookie(res, user.accessToken, user.refreshToken);
    return res.send(user);
  }

  @SwaggerSignUp()
  @UsePipes(ValidationPipe)
  @Post("/sign-up")
  async signUp(@Body() userDto: CreateUserDto, @Res() res: FastifyReply) {
    const user = await this.authService.signUp(userDto);
    this.setCookie(res, user.accessToken, user.refreshToken);
    return res.send(user);
  }

  private setCookie(
    res: FastifyReply,
    accessToken: string,
    refreshToken: string
  ) {
    res.setCookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });
  }
}
