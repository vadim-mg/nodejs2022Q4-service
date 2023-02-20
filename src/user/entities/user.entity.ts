import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ format: 'UUID', required: true })
  id: string; // uuid v4

  @ApiProperty({
    description: 'User login',
    type: 'string',
  })
  login: string;

  @ApiProperty()
  version: number; //  increments on update

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  updatedAt: number;
}
