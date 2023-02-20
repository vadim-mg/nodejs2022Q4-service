import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateIf,
  isUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ValidateIf((_object, value) => value === null || isUUID(value))
  artistId: string | null; // refers to Artist
}
