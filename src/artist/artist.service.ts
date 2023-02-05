import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { db } from 'src/utils/DB/db.service';

@Injectable()
export class ArtistService {
  async create(createArtistDto: CreateArtistDto) {
    return await db.artists.create(createArtistDto);
  }

  async findAll() {
    return await db.artists.findMany();
  }

  async findOne(id: string) {
    return await db.artists.findOne({ key: 'id', equals: id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const foundArtist = await db.artists.findOne({ key: 'id', equals: id })
    if (!foundArtist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return await db.artists.change(id, updateArtistDto);
  }

  async remove(id: string) {
    return await db.artists.delete(id);
  }
}
