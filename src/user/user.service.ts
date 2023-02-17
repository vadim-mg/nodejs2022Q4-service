import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { hash as passHash, compare as passCompare } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel } from '@prisma/client';

const saltOrRounds = 10;
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private clearUser(user: UserModel) {
    if (user && user.password) {
      return {
        id: user.id,
        login: user.login,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
        version: user.version,
      };
    }
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await passHash(
      createUserDto.password,
      saltOrRounds,
    );
    return this.clearUser(
      await this.prisma.user.create({
        data: { ...createUserDto },
      }),
    );
  }

  async findAll() {
    return (await this.prisma.user.findMany()).map(this.clearUser);
  }

  async findOne(id: string) {
    return this.clearUser(await this.prisma.user.findUnique({ where: { id } }));
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });
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
      updatedAt: new Date(),
      version: foundUser.version + 1,
    };
    return this.clearUser(
      await this.prisma.user.update({
        where: { id },
        data: {
          password: changeUserDto.password,
          updatedAt: changeUserDto.updatedAt,
          version: changeUserDto.version,
        },
      }),
    );
  }

  async remove(id: string) {
    return this.clearUser(
      await this.prisma.user.delete({
        where: { id },
      }),
    );
  }
}
