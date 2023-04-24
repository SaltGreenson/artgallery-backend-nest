import { ApiProperty } from "@nestjs/swagger";

export class CreateGalleryDto {
  @ApiProperty({
    example: "Title",
  })
  readonly title: string;
}
