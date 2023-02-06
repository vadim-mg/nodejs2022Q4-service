import { IsNotEmpty, Length } from 'class-validator';
export class UpdatePasswordDto {
  @IsNotEmpty()
  @Length(3, 20)
  oldPassword: string; // previous password

  @IsNotEmpty()
  @Length(3, 20)
  newPassword: string;
}
