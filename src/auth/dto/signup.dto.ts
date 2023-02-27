import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'User password (min-length: 4 characters)',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  password: string;
}
