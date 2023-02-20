import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma.service';
import { Track } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.prisma.track.create({
      data: { ...createTrackDto },
    });
  }

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    return await this.prisma.track.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    return await this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
  }

  async remove(id: string) {
    return await this.prisma.track.delete({
      where: { id },
    });
  }
}
