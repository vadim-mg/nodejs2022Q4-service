import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  isUUID,
  IsNumber,
} from 'class-validator';
export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((_object, value) => value === null || isUUID(value))
  artistId: string | null; // refers to Artist

  @ValidateIf((_object, value) => value === null || isUUID(value))
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
