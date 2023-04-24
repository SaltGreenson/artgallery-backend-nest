import { ApiProperty } from "@nestjs/swagger";

export class EditGalleryDto {
  @ApiProperty({
    example: "hdksjlgmsdf.131231.awdawdasdaujkw",
  })
  readonly galleryId: string;

  @ApiProperty({
    example: "Title",
  })
  readonly title: string;
}
