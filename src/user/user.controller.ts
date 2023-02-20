import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { HttpException } from '@nestjs/common/exceptions';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiNoContentResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new user',
    description: 'Add new user',
  })
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'Newly created record',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'User ID for search in DB',
    examples: {
      a: {
        value: '2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example UUID',
      },
    },
  })
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'User was not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.userService.findOne(id);
    if (!result) {
      throw new HttpException('NOT_FOUND', StatusCodes.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user password by UUID',
    description: 'Update user password by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'User ID for search in DB',
    examples: {
      a: {
        value: '2bab8a9f-b81a-47f7-bcdb-1dadaa8e4415',
        summary: 'example UUID',
      },
    },
  })
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiForbiddenResponse({
    description: ' oldPassowrd is wrong',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const changedUser = await this.userService.update(id, updatePasswordDto);
    switch (changedUser) {
      case StatusCodes.NOT_FOUND:
        throw new HttpException('NOT_FOUND', StatusCodes.NOT_FOUND);
      case StatusCodes.FORBIDDEN:
        throw new HttpException('FORBIDDEN', StatusCodes.FORBIDDEN);
      default:
        return changedUser;
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete user by UUID',
    description: 'Delete user by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'String(UUID)',
    description: 'User ID for delete from DB',
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
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const deletedUser = await this.userService.remove(id);
      return deletedUser;
    } catch (err) {
      throw new HttpException('NOT_FOUND', StatusCodes.NOT_FOUND);
    }
  }
}
