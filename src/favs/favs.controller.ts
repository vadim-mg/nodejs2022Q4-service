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
import { FavsEntity, FavsTypes } from './entities/favs.entity';
import { FavsService } from './favs.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('favs')
@ApiTags('favorites')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites movies, tracks and books',
  })
  @ApiOkResponse({ type: FavsEntity, description: 'Successful operation' })
  async getAll() {
    return await this.favsService.getAll();
  }

  @Post('/:type/:id')
  @ApiOperation({
    summary: 'Add new favorites',
    description: 'Add new favorites',
  })
  @ApiParam({
    name: 'type',
    type: 'enum: (artist, album, track)',
    description: 'Favorites ID for delete from DB',
    examples: {
      a: {
        value: 'artist',
        summary: 'example artist type',
      },
    },
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Favorites ID for delete from DB',
    examples: {
      a: {
        value: '2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example UUID',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Newly created record',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnprocessableEntityResponse({
    description: "id doesn't exist",
  })
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
  @ApiOperation({
    summary: 'Delete favorites by UUID',
    description: 'Delete favorites by UUID',
  })
  @ApiParam({
    name: 'type',
    type: 'enum: (artist, album, track)',
    description: 'Favorites ID for delete from DB',
    examples: {
      a: {
        value: 'artist',
        summary: 'example artist type',
      },
    },
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Favorites ID for delete from DB',
    examples: {
      a: {
        value: '2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example UUID',
      },
    },
  })
  @ApiNoContentResponse({
    description: 'Delelted succesfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. favoritId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Favorite not found',
  })
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
