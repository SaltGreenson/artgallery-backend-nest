import { Controller, Get } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { Role } from "./role.schema";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Roles")
@Controller("/api/roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: "Get all roles" })
  @ApiResponse({ status: 200, type: [Role] })
  @Get("/")
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }
}
