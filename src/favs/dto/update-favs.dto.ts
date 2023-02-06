import { PartialType } from '@nestjs/swagger';
import { CreateFavDto } from './create-favs.dto';

export class UpdateFavDto extends PartialType(CreateFavDto) {}
