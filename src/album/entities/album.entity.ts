import { ApiProperty } from '@nestjs/swagger';
import { Album } from '@prisma/client';

export class AlbumEntity implements Album {
  @ApiProperty({ format: 'UUID', required: true })
  id: string; // uuid

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  artistId: string | null; // refers to Artist
}
