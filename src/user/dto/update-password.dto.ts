import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  oldPassword: string; // previous password

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  newPassword: string;
}
