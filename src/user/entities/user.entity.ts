import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  id: string; // uuid v4

  @ApiProperty({
    description: 'User login',
    type: 'string',
  })
  login: string;

  @ApiProperty()
  password: string;

  version: number; // integer number, increments on update

  createdAt: number; // timestamp of creation

  updatedAt: number; // timestamp of last update
}
