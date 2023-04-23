import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { GalleriesService } from "./galleries.service";
import { CreateGalleryDto } from "./dto/create-gallery.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import {
  SwaggerCreateGallery,
  SwaggerDeleteGallery,
  SwaggerDislikeGallery,
  SwaggerGetAllGalleries,
  SwaggerGetGalleryById,
  SwaggerGetOwnGalleries,
  SwaggerLikeGallery,
} from "./swagger.decorator";
import { Express } from "express";
import { gallerySortCriteriaHelper } from "./helpers/gallerySortCriteria.helper";
import { IncomingHttpHeaders } from "http";
import { LikedDislikeGalleryDto } from "./dto/liked-dislike-gallery.dto";
import { EditGalleryDto } from "./dto/edit-gallery.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Galleries")
@Controller("/api/galleries")
export class GalleriesController {
  constructor(private galleriesService: GalleriesService) {}

  @SwaggerGetAllGalleries()
  @Get()
  async getAll(
    @Query() skip = 0,
    @Query() limit = 10,
    @Query() isFirstLiked?: string,
    @Query() userId?: string,
    @Query() searchString?: string
  ) {
    return this.galleriesService.getAll({
      skip: skip,
      limit: limit,
      userId: userId,
      sortCriteria: gallerySortCriteriaHelper(isFirstLiked),
      searchString: searchString,
    });
  }

  @SwaggerCreateGallery()
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  @UseInterceptors(FileInterceptor("photo[]"))
  create(
    @Req() req: Request & { headers: IncomingHttpHeaders },
    @Body() dto: CreateGalleryDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    const { authorization } = req.headers;
    return this.galleriesService.create(dto, image, authorization);
  }

  @SwaggerDeleteGallery()
  @UseGuards(JwtAuthGuard)
  @Delete("/remove")
  remove(
    @Req() req: Request & { headers: IncomingHttpHeaders },
    @Query() galleryId: string
  ) {
    const { authorization } = req.headers;
    return this.galleriesService.remove(galleryId, authorization);
  }

  @SwaggerLikeGallery()
  @UseGuards(JwtAuthGuard)
  @Put("/like")
  like(
    @Req() req: Request & { headers: IncomingHttpHeaders },
    @Body() dto: LikedDislikeGalleryDto
  ) {
    const { authorization } = req.headers;
    return this.galleriesService.like(dto.galleryId, authorization);
  }

  @SwaggerDislikeGallery()
  @UseGuards(JwtAuthGuard)
  @Put("/dislike")
  dislike(
    @Req() req: Request & { headers: IncomingHttpHeaders },
    @Body() dto: LikedDislikeGalleryDto
  ) {
    const { authorization } = req.headers;
    return this.galleriesService.dislike(dto.galleryId, authorization);
  }

  @SwaggerGetOwnGalleries()
  @UseGuards(JwtAuthGuard)
  @Get("/own")
  own(
    @Req() req: Request & { headers: IncomingHttpHeaders },
    @Query() skip = 0,
    @Query() limit = 10,
    @Query() isFirstLiked?: string,
    @Query() userId?: string,
    @Query() searchString?: string
  ) {
    const { authorization } = req.headers;
    return this.galleriesService.getOwnArts({
      skip,
      limit,
      searchString,
      sortCriteria: gallerySortCriteriaHelper(isFirstLiked),
      authHeader: authorization,
    });
  }

  @SwaggerGetGalleryById()
  @Get("/one")
  one(@Req() req: Request, @Query() galleryId: string) {
    return this.galleriesService.getById(galleryId);
  }

  @SwaggerGetGalleryById()
  @UseGuards(JwtAuthGuard)
  @Get("/edit")
  edit(
    @Req() req: Request & { headers: IncomingHttpHeaders },
    @Body() dto: EditGalleryDto
  ) {
    const { authorization } = req.headers;
    return this.galleriesService.edit(dto, authorization);
  }
}
