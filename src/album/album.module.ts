import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService],
})
export class AlbumModule {}
