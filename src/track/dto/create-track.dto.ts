import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  isUUID,
  IsNumber,
} from 'class-validator';
export class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @ValidateIf((_object, value) => value === null || isUUID(value))
  artistId: string | null; // refers to Artist

  @ApiProperty()
  @ValidateIf((_object, value) => value === null || isUUID(value))
  albumId: string | null; // refers to Album

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
