import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { db } from 'src/utils/DB/db.service';

@Injectable()
export class AlbumService {
  private async isArtistIdValid(id: string) {
    if (id && !(await db.artists.findOne({ key: 'id', equals: id })))
      throw new HttpException(
        `BAD_REQUEST: artistID(${id}) does not exist!`,
        HttpStatus.BAD_REQUEST,
      );
    return true;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    if (await this.isArtistIdValid(createAlbumDto.artistId)) {
      return await db.albums.create(createAlbumDto);
    }
    return null;
  }

  async findAll() {
    return await db.albums.findMany();
  }

  async findOne(id: string) {
    return await db.albums.findOne({ key: 'id', equals: id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const foundAlbum = await db.albums.findOne({ key: 'id', equals: id });
    if (!foundAlbum) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    if (await this.isArtistIdValid(updateAlbumDto.artistId)) {
      return await db.albums.change(id, updateAlbumDto);
    }
    return null;
  }

  async remove(id: string) {
    const removed = await db.albums.delete(id);
    if (removed) {
      const tracksRef = await db.tracks.findMany({
        key: 'albumId',
        equals: removed.id,
      });
      tracksRef.forEach(
        async (track) => await db.tracks.change(track.id, { albumId: null }),
      );
    }
    return removed;
  }
}
