import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, PrismaService],
})
export class TrackModule {}
