import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseEnumPipe,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { FavsTypes } from './entities/favs.entity';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async getAll() {
    return await this.favsService.getAll();
  }

  @Post('/:type/:id')
  async addFav(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('type', new ParseEnumPipe(FavsTypes)) type: FavsTypes,
  ) {
    try {
      return await this.favsService.add({ type, id });
    } catch (err) {
      throw new HttpException(
        `UNPROCESSABLE_ENTITY: ${type} ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('/:type/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeFav(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('type', new ParseEnumPipe(FavsTypes)) type: FavsTypes,
  ) {
    try {
      return await this.favsService.remove(id, type);
    } catch {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
