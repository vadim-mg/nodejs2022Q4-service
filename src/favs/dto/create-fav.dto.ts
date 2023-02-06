import { IsUUID, IsEnum } from 'class-validator';
import { FavTypes } from '../entities/fav.entity';

export class CreateFavDto {
  @IsUUID()
  id: string;

  @IsEnum(FavTypes)
  type: FavTypes;
}
