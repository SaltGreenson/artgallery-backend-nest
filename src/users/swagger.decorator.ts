import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";
import { User } from "./user.schema";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { Gallery } from "../galleries/gallery.schema";

export function SwaggerGetAllUsers() {
  return applyDecorators(
    ApiOperation({ summary: "Get all users" }),
    ApiResponse({ status: 200, type: [User] }),
    ApiQuery({ name: "skip", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "limit", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "searchString", allowEmptyValue: true, required: false })
  );
}

export function SwaggerSetUserRole() {
  return applyDecorators(
    ApiOperation({ summary: "Set user role" }),
    ApiResponse({ status: 200, type: AddRoleDto }),
    ApiBody({ type: AddRoleDto })
  );
}

export function SwaggerBanUser() {
  return applyDecorators(
    ApiOperation({ summary: "Ban user" }),
    ApiResponse({ status: 200, type: BanUserDto }),
    ApiBody({ type: BanUserDto })
  );
}

export function SwaggerUserLikedPosts() {
  return applyDecorators(
    ApiOperation({ summary: "Liked posts" }),
    ApiResponse({ status: 200, type: [Gallery] }),
    ApiHeader({ name: "Authorization" }),
    ApiQuery({ name: "skip", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "limit", allowEmptyValue: true, required: false })
  );
}
