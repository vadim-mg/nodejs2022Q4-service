import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DBModule {}
