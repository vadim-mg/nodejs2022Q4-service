import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
})
export class ArtistModule {}
