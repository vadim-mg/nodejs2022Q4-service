import * as crypto from 'node:crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import DBEntity from './DBEntity';

export default class DBUsers extends DBEntity<
  UserEntity,
  UpdateUserDto,
  CreateUserDto
> {
  async create(dto: CreateUserDto) {
    const timestamp = new Date().getTime();
    const created: UserEntity = {
      ...dto,
      id: crypto.randomUUID(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.entities.push(created);
    return created;
  }
}
