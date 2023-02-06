import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'User password (min-length: 4 characters)',
    type: 'string',
  })
  @IsNotEmpty()
  @Length(4, 20)
  password: string;
}
