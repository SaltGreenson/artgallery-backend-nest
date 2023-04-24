import { ApiProperty } from "@nestjs/swagger";

export class LikedDislikeGalleryDto {
  @ApiProperty({
    example: "hdksjlgmsdf.131231.awdawdasdaujkw",
  })
  readonly galleryId: string;
}
