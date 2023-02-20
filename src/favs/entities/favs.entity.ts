export enum FavsTypes {
  artist = 'artist',
  album = 'album',
  track = 'track',
}
import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

export class FavsEntity {
  @ApiProperty({
    type: ArtistEntity,
    isArray: true,
  })
  artists: ArtistEntity[];

  @ApiProperty({
    type: AlbumEntity,
    isArray: true,
  })
  albums: AlbumEntity[];

  @ApiProperty({
    type: TrackEntity,
    isArray: true,
  })
  track: TrackEntity[];
}
