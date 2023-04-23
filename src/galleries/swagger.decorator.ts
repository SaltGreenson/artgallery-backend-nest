import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Gallery } from "./gallery.schema";
import { CreateGalleryDto } from "./dto/create-gallery.dto";

export function SwaggerCreateGallery() {
  return applyDecorators(
    ApiOperation({ summary: "Create gallery" }),
    ApiResponse({ status: 200, type: Gallery }),
    ApiBody({ type: CreateGalleryDto })
  );
}
