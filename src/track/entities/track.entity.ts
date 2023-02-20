import { ApiProperty } from '@nestjs/swagger';

export class TrackEntity {
  @ApiProperty({ format: 'UUID', required: true })
  id: string; // uuid v4

  @ApiProperty()
  name: string;

  @ApiProperty()
  artistId: string | null; // refers to Artist

  @ApiProperty()
  albumId: string | null; // refers to Album

  @ApiProperty()
  duration: number; // integer number
}
