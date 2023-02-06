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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.userService.findOne(id);
    if (!result) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const changedUser = await this.userService.update(id, updatePasswordDto);
    if (changedUser === 404) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (changedUser === 403) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    return changedUser;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const deletedUser = await this.userService.remove(id);
      return deletedUser;
    } catch (err) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
