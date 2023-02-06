import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { InitTestData } from './init.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService, InitTestData],
})
export class FavsModule { }
