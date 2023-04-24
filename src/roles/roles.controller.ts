import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { Role } from "./role.schema";
import { ApiTags } from "@nestjs/swagger";
import { SwaggerCreateRole, SwaggerGetAllRoles } from "./swagger.decorator";
import { CreateRoleDto } from "./dto/create-role.dto";

@ApiTags("Roles")
@Controller("/api/roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @SwaggerGetAllRoles()
  @Get()
  async findAll(
    @Query("searchString") searchString = "",
    @Query("skip") skip = 0,
    @Query("limit") limit = 10
  ): Promise<Role[]> {
    return this.roleService.findAll(searchString, skip, limit);
  }

  @SwaggerCreateRole()
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(dto);
  }
}
