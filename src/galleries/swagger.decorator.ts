import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";
import { Gallery } from "./gallery.schema";
import { CreateGalleryDto } from "./dto/create-gallery.dto";
import { LikedDislikeGalleryDto } from "./dto/liked-dislike-gallery.dto";

export function SwaggerCreateGallery() {
  return applyDecorators(
    ApiOperation({ summary: "Create gallery" }),
    ApiResponse({ status: 200, type: Gallery }),
    ApiHeader({ name: "Authorization" }),
    ApiBody({ type: CreateGalleryDto })
  );
}

export function SwaggerDeleteGallery() {
  return applyDecorators(
    ApiOperation({ summary: "Delete gallery" }),
    ApiResponse({ status: 200, type: Gallery }),
    ApiHeader({ name: "Authorization" }),
    ApiQuery({ name: "galleryId", allowEmptyValue: false, required: true })
  );
}

export function SwaggerLikeGallery() {
  return applyDecorators(
    ApiOperation({ summary: "Like gallery" }),
    ApiResponse({ status: 200, type: Gallery }),
    ApiHeader({ name: "Authorization" }),
    ApiBody({ type: LikedDislikeGalleryDto })
  );
}

export function SwaggerDislikeGallery() {
  return applyDecorators(
    ApiOperation({ summary: "Dislike gallery" }),
    ApiResponse({ status: 200, type: Gallery }),
    ApiHeader({ name: "Authorization" }),
    ApiBody({ type: LikedDislikeGalleryDto })
  );
}

export function SwaggerGetAllGalleries() {
  return applyDecorators(
    ApiOperation({ summary: "Get all galleries" }),
    ApiResponse({ status: 200, type: [Gallery] }),
    ApiQuery({ name: "skip", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "limit", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "searchString", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "isFirstLiked", allowEmptyValue: true, required: false })
  );
}

export function SwaggerGetOwnGalleries() {
  return applyDecorators(
    ApiOperation({ summary: "Get own galleries" }),
    ApiResponse({ status: 200, type: [Gallery] }),
    ApiQuery({ name: "skip", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "limit", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "searchString", allowEmptyValue: true, required: false }),
    ApiQuery({ name: "isFirstLiked", allowEmptyValue: true, required: false })
  );
}

export function SwaggerGetGalleryById() {
  return applyDecorators(
    ApiOperation({ summary: "Get gallery by id" }),
    ApiResponse({ status: 200, type: Gallery }),
    ApiQuery({ name: "galleryId", allowEmptyValue: false, required: true })
  );
}
