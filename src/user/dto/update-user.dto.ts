import { IsNotEmpty, Length } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  version: number; // integer number, increments on update

  @IsNotEmpty()
  updatedAt: number; // timestamp of last update
}
