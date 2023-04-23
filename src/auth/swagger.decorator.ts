import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { IUserWithTokens } from "./types/IUserWithTokens";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthUserDto } from "./dto/auth-user.dto";

export function SwaggerSignUp() {
  return applyDecorators(
    ApiOperation({ summary: "Sign up" }),
    ApiResponse({ status: 200, type: IUserWithTokens }),
    ApiBody({ type: CreateUserDto })
  );
}

export function SwaggerLogIn() {
  return applyDecorators(
    ApiOperation({ summary: "Log in" }),
    ApiResponse({ status: 200, type: IUserWithTokens }),
    ApiBody({ type: AuthUserDto })
  );
}

export function SwaggerLogout() {
  return applyDecorators(
    ApiOperation({ summary: "Logout" }),
    ApiResponse({ status: 200, type: IUserWithTokens })
  );
}

export function SwaggerRefresh() {
  return applyDecorators(
    ApiOperation({ summary: "Refresh access token" }),
    ApiResponse({ status: 200, type: IUserWithTokens })
  );
}
