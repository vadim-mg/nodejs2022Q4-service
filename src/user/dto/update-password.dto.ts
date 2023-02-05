import { IsNotEmpty, Length } from 'class-validator';
export class UpdatePasswordDto {
  @IsNotEmpty()
  @Length(6, 20)
  oldPassword: string; // previous password

  @IsNotEmpty()
  @Length(6, 20)
  newPassword: string;
}
