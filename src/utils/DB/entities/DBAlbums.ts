import * as crypto from 'node:crypto';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { AlbumEntity } from 'src/album/entities/album.entity';
import DBEntity from './DBEntity';

export default class DBAlbums extends DBEntity<
  AlbumEntity,
  UpdateAlbumDto,
  CreateAlbumDto
> {
  async create(dto: CreateAlbumDto) {
    const created: AlbumEntity = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}
