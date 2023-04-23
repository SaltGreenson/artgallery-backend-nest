import { applyDecorators } from "@nestjs/common";
import { ApiResponse, ApiQuery, ApiOperation } from "@nestjs/swagger";
import { Role } from "./role.schema";

export function SwaggerGetAllRoles() {
  return applyDecorators(
    ApiOperation({ summary: "Get all roles" }),
    ApiResponse({ status: 200, type: [Role] }),
    ApiQuery({ name: "skip", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "limit", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "searchString", allowEmptyValue: true, required: false })
  );
}

export function SwaggerCreateRole() {
  return applyDecorators(
    ApiOperation({ summary: "Create role" }),
    ApiResponse({ status: 200, type: Role })
  );
}
