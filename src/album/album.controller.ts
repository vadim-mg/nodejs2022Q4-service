import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@Controller('album')
@ApiTags('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album',
  })
  @ApiCreatedResponse({
    type: AlbumEntity,
    description: 'Newly created record',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      return await this.albumService.create(createAlbumDto);
    } catch (err) {
      throw new HttpException('Bad_request: ', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all albums',
    description: 'Get all albums',
  })
  @ApiOkResponse({
    type: AlbumEntity,
    isArray: true,
    description: 'Successful operation',
  })
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Get single album by id',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Album ID for search in DB',
    examples: {
      b: {
        value: '/album/2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example request',
      },
    },
  })
  @ApiOkResponse({ type: AlbumEntity, description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.albumService.findOne(id);
    if (!result) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album information by UUID',
    description: 'Update album information by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Album ID for search in DB',
    examples: {
      a: {
        value: '2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example UUID',
      },
    },
  })
  @ApiOkResponse({ type: AlbumEntity, description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found.',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return await this.albumService.update(id, updateAlbumDto);
    } catch (err) {
      if (err.code === 'P2023')
        throw new HttpException('BAD_REQUEST!', HttpStatus.BAD_REQUEST);
      throw new HttpException('NOT_FOUND!', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete album by UUID',
    description: 'Delete album by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Album ID for delete from DB',
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
    description: 'Bad request. Album is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: "albumId doesn't exist",
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const deletedAlbum = await this.albumService.remove(id);
      return deletedAlbum;
    } catch {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
