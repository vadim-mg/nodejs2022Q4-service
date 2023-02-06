import * as crypto from 'node:crypto';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import DBEntity from './DBEntity';

export default class DBArtists extends DBEntity<
  ArtistEntity,
  UpdateArtistDto,
  CreateArtistDto
> {
  async create(dto: CreateArtistDto) {
    const created: ArtistEntity = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}
