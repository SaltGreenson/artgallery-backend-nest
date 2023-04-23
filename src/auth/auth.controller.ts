import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
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

// TODO: get refreshToken from cookie

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @SwaggerLogIn()
  @Post("/log-in")
  async login(@Body() userDto: AuthUserDto) {
    return this.authService.login(userDto);
  }

  @SwaggerLogout()
  @UseGuards(JwtAuthGuard)
  @Delete("/logout")
  async logout() {
    return this.authService.logout("");
  }

  @SwaggerRefresh()
  @UseGuards(JwtAuthGuard)
  @Put("/refresh")
  async refresh() {
    return this.authService.refresh("");
  }

  @SwaggerSignUp()
  @UsePipes(ValidationPipe)
  @Post("/sign-up")
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
}
