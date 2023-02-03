import { PartialType } from '@nestjs/mapped-types';
import { CreateFavDto } from './create-fav.dto';

export class UpdateFavDto extends PartialType(CreateFavDto) {}
