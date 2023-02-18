import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: { ...data },
    });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.artist.findUnique({ where: { id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const foundArtist = await this.findOne(id);
    if (!foundArtist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
  }

  async remove(id: string) {
    const removed = await this.prisma.artist.delete({
      where: { id },
    });
    //TODO cascade set null


    // if (removed) {
    //   const albumsRef = await db.albums.findMany({
    //     key: 'artistId',
    //     equals: removed.id,
    //   });
    //   albumsRef.forEach(
    //     async (album) => await db.albums.change(album.id, { artistId: null }),
    //   );
    //   const tracksRef = await db.tracks.findMany({
    //     key: 'artistId',
    //     equals: removed.id,
    //   });
    //   tracksRef.forEach(
    //     async (track) => await db.tracks.change(track.id, { artistId: null }),
    //   );
    //   try {
    //     await db.favs.delete(id);
    //   } catch { }
    // }
    return removed;
  }
}
