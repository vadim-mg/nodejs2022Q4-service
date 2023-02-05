import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateIf,
  isUUID,
} from 'class-validator';
export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ValidateIf((_object, value) => value === null || isUUID(value))
  artistId: string | null; // refers to Artist
}
