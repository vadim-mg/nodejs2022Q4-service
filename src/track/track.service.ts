import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { db } from 'src/utils/DB/db.service';

@Injectable()
export class TrackService {
  private async isArtistIdValid(id: string) {
    if (id && !(await db.artists.findOne({ key: 'id', equals: id })))
      throw new HttpException(
        `BAD_REQUEST: artistID(${id}) does not exist!`,
        HttpStatus.BAD_REQUEST,
      );
    return true;
  }
  private async isAlbumIdValid(id: string) {
    if (id && !(await db.albums.findOne({ key: 'id', equals: id })))
      throw new HttpException(
        `BAD_REQUEST: albumId(${id}) does not exist!`,
        HttpStatus.BAD_REQUEST,
      );
    return true;
  }

  async create(createTrackDto: CreateTrackDto) {
    if (
      (await this.isArtistIdValid(createTrackDto.artistId)) &&
      (await this.isAlbumIdValid(createTrackDto.albumId))
    ) {
      return await db.tracks.create(createTrackDto);
    }
    return null;
  }

  async findAll() {
    return await db.tracks.findMany();
  }

  async findOne(id: string) {
    return await db.tracks.findOne({ key: 'id', equals: id });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const foundTrack = await db.tracks.findOne({ key: 'id', equals: id });
    if (!foundTrack) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    if (
      (await this.isArtistIdValid(updateTrackDto.artistId)) &&
      (await this.isAlbumIdValid(updateTrackDto.albumId))
    ) {
      return await db.tracks.change(id, updateTrackDto);
    }
    return null;
  }

  async remove(id: string) {
    const deleted = await db.tracks.delete(id);
    if (deleted) {
      try {
        await db.favs.delete(id);
      } catch {}
    }
    return deleted;
  }
}
