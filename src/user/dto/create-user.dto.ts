import { IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
