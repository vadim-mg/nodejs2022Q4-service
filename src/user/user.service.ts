import { Injectable } from '@nestjs/common';
import { db } from 'src/utils/DB/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { hash as passHash, compare as passCompare } from 'bcrypt';

const saltOrRounds = 10;
@Injectable()
export class UserService {
  private clearUser(user: UserEntity) {
    if (user && user.password) {
      delete user.password;
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await passHash(
      createUserDto.password,
      saltOrRounds,
    );
    return this.clearUser(await db.users.create(createUserDto));
  }

  async findAll() {
    return (await db.users.findMany()).map(this.clearUser);
  }

  async findOne(id: string) {
    return this.clearUser(await db.users.findOne({ key: 'id', equals: id }));
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    console.log('--------');
    const foundUser = await db.users.findOne({ key: 'id', equals: id });
    console.log(foundUser);
    if (foundUser === null) {
      return 404;
    }
    const isMatch = await passCompare(
      updatePasswordDto.oldPassword,
      foundUser.password,
    );
    if (!isMatch) {
      return 403;
    }
    const changeUserDto = {
      password: await passHash(updatePasswordDto.newPassword, saltOrRounds),
      updatedAt: new Date().getTime(),
      version: foundUser.version + 1,
    };
    return this.clearUser(await db.users.change(id, changeUserDto));
  }

  async remove(id: string) {
    return this.clearUser(await db.users.delete(id));
  }
}
