import { Body, Controller, Get, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import {
  SwaggerBanUser,
  SwaggerGetAllUsers,
  SwaggerSetUserRole,
} from "./swagger.decorator";
import { Roles } from "../auth/role-auth.decorator";
import { RolesGuard } from "../auth/roles-auth.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@ApiTags("Users")
@Controller("/api/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @SwaggerGetAllUsers()
  @Roles("ADMIN", "MODERATOR")
  @UseGuards(RolesGuard)
  @Get()
  findAll(
    @Query("searchString") searchString = "",
    @Query("skip") skip = 0,
    @Query("limit") limit = 10
  ) {
    return this.usersService.findAll(searchString, skip, limit);
  }
  @SwaggerSetUserRole()
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put("/add-role")
  async addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @SwaggerBanUser()
  @Roles("ADMIN", "MODERATOR")
  @UseGuards(RolesGuard)
  @Put("/ban")
  async ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
