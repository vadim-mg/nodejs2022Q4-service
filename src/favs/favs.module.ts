import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';

@Module({
  controllers: [FavsController],
  providers: [FavsService]
})
export class FavsModule {}
