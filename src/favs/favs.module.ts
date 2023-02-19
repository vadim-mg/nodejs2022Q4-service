import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { InitTestData } from './init.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService, InitTestData, PrismaService],
})
export class FavsModule {}
