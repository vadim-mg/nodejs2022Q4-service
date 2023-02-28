import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
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

@Controller('artist')
@ApiTags('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist',
  })
  @ApiCreatedResponse({
    type: ArtistEntity,
    description: 'Newly created record',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Get all artists',
  })
  @ApiOkResponse({
    type: ArtistEntity,
    isArray: true,
    description: 'Successful operation',
  })
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Artist ID for search in DB',
    examples: {
      a: {
        value: '2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example UUID',
      },
      b: {
        value: '/artist/2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example request',
      },
    },
  })
  @ApiOkResponse({ type: ArtistEntity, description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Artist was not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.artistService.findOne(id);
    if (!result) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update artist information by UUID',
    description: 'Update artist information by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Artist ID for search in DB',
    examples: {
      a: {
        value: '2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example UUID',
      },
    },
  })
  @ApiOkResponse({ type: ArtistEntity, description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiNotFoundResponse({
    description: "artistId doesn't exist",
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      return await this.artistService.update(id, updateArtistDto);
    } catch (err) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete artist by UUID',
    description: 'Delete artist by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Artist ID for delete from DB',
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
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: "artistId doesn't exist",
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.artistService.remove(id);
    } catch (err) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
