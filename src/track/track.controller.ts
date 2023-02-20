import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
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

@Controller('track')
@ApiTags('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) { }

  @Post()
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track',
  })
  @ApiCreatedResponse({
    type: TrackEntity,
    description: 'Newly created record',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createTrackDto: CreateTrackDto) {
    try {
      return await this.trackService.create(createTrackDto);
    } catch (err) {
      throw new HttpException(
        'Bad_request: ' /* + err.message */,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tracks',
    description: 'Get all tracks',
  })
  @ApiOkResponse({ type: TrackEntity, isArray: true })
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Get single track by id',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Track ID for search in DB',
    examples: {
      a: {
        value: '2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example UUID',
      },
      b: {
        value: '/track/2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example request',
      },
    },
  })
  @ApiOkResponse({ type: TrackEntity })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Track was not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.trackService.findOne(id);
    if (!result) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update track information by UUID',
    description: 'Update track information by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Track ID for search in DB',
    examples: {
      a: {
        value: '2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example UUID',
      },
    },
  })
  @ApiOkResponse({ type: TrackEntity })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiNotFoundResponse({
    description: "trackId doesn't exist",
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return await this.trackService.update(id, updateTrackDto);
    } catch (err) {
      if (err.code === 'P2023')
        throw new HttpException('BAD_REQUEST!', HttpStatus.BAD_REQUEST);
      throw new HttpException('NOT_FOUND!', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete track by UUID',
    description: 'Delete track by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'Track ID for delete from DB',
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
    description: 'Bad request. Track is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: "track doesn't exist",
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const deletedTrack = await this.trackService.remove(id);
      return deletedTrack;
    } catch {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
