import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import {
  SwaggerBanUser,
  SwaggerGetAllUsers,
  SwaggerSetUserRole,
  SwaggerUserLikedPosts,
} from "./swagger.decorator";
import { Roles } from "../auth/role-auth.decorator";
import { RolesGuard } from "../auth/roles-auth.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { IncomingHttpHeaders } from "http";
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
    @Query()
    query: {
      skip: number;
      limit: number;
    }
  ) {
    return this.usersService.findAll(searchString, query.skip, query.limit);
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
  @SwaggerUserLikedPosts()
  @UseGuards(JwtAuthGuard)
  @Get("/liked-posts")
  async likedPosts(
    @Req() req: Request & { headers: IncomingHttpHeaders },
    @Query()
    query: {
      skip: number;
      limit: number;
    }
  ) {
    const { authorization } = req.headers;

    return this.usersService.getLiked(query.skip, query.limit, authorization);
  }
}
