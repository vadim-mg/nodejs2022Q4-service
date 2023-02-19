import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-favs.dto';
import { FavsTypes } from './entities/favs.entity';
import { FavoriteArtist, FavoriteAlbum, FavoriteTrack } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) { }

  async getAll() {
    const allFavs = {};

    allFavs[FavsTypes.artist + 's'] = await this.prisma.artist.findMany({
      where: {
        FavoriteArtist: {
          some: {
            artistId: {},
          },
        },
      },
    });
    allFavs[FavsTypes.album + 's'] = await this.prisma.album.findMany({
      where: {
        FavoriteAlbum: {
          some: {
            albumId: {},
          },
        },
      },
    });
    allFavs[FavsTypes.track + 's'] = await this.prisma.track.findMany({
      where: {
        FavoriteTrack: {
          some: {
            trackId: {},
          },
        },
      },
    });
    return allFavs;
  }

  async add(
    createFavDto: CreateFavDto,
  ): Promise<FavoriteArtist | FavoriteAlbum | FavoriteTrack> {
    switch (createFavDto.type) {
      case FavsTypes.artist:
        return await this.prisma.favoriteArtist.create({
          data: { artistId: createFavDto.id },
        });
      case FavsTypes.album:
        return await this.prisma.favoriteAlbum.create({
          data: { albumId: createFavDto.id },
        });
      case FavsTypes.track:
        return await this.prisma.favoriteTrack.create({
          data: { trackId: createFavDto.id },
        });
    }
  }

  async remove(id: string, type: FavsTypes) {
    switch (type) {
      case FavsTypes.artist:
        return await this.prisma.favoriteArtist.delete({
          where: { artistId: id },
        });
      case FavsTypes.album:
        return await this.prisma.favoriteAlbum.delete({
          where: { albumId: id },
        });
      case FavsTypes.track:
        return await this.prisma.favoriteTrack.delete({
          where: { trackId: id },
        });
    }
  }
}
