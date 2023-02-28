import { IsUUID, IsEnum } from 'class-validator';
import { FavsTypes } from '../entities/favs.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavDto {
  @ApiProperty({
    description: 'Id (UUID) of entity which we will add to favorites',
    type: 'string',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Type of entity which we will add to favorites',
    type: 'string',
    enum: ['artist', 'album', 'track'],
  })
  @IsEnum(FavsTypes)
  type: FavsTypes;
}
