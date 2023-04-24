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
import { Request, Response } from "express";

@ApiTags("Auth")
@Controller("/api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @SwaggerLogIn()
  @Post("/log-in")
  async login(
    @Body() userDto: AuthUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.authService.login(userDto);
    this.setCookie(res, user.accessToken, user.refreshToken);
    return res.send(user);
  }

  @SwaggerLogout()
  @UseGuards(JwtAuthGuard)
  @Delete("/logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.send(this.authService.logout(refreshToken));
  }

  @SwaggerRefresh()
  @UseGuards(JwtAuthGuard)
  @Put("/refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken } = req.cookies;
    const user = await this.authService.refresh(refreshToken);
    this.setCookie(res, user.accessToken, user.refreshToken);
    return res.send(user);
  }

  @SwaggerSignUp()
  @UsePipes(ValidationPipe)
  @Post("/sign-up")
  async signUp(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.authService.signUp(userDto);
    this.setCookie(res, user.accessToken, user.refreshToken);
    return res.send(user);
  }

  private setCookie(res: Response, accessToken: string, refreshToken: string) {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });
  }
}
