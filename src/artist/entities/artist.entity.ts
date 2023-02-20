import { Artist } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity implements Artist {
  @ApiProperty({ format: 'UUID', required: true })
  id: string; // uuid v4

  @ApiProperty()
  name: string;

  @ApiProperty()
  grammy: boolean;
}
