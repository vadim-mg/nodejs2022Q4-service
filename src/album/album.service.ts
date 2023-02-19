import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.create({
      data: { ...createAlbumDto },
    });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.album.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });
  }

  async remove(id: string) {
    return await this.prisma.album.delete({
      where: { id },
    });
  }
}
