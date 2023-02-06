import { CreateFavDto } from 'src/favs/dto/create-fav.dto';
import { UpdateFavDto } from 'src/favs/dto/update-fav.dto';
import { FavEntity } from 'src/favs/entities/fav.entity';
import DBEntity from './DBEntity';

export default class DBFav extends DBEntity<
  FavEntity,
  UpdateFavDto,
  CreateFavDto
> {
  async create(dto: CreateFavDto) {
    const isExist = await this.findOne({
      key: 'id',
      equals: dto.id,
    });
    if (!isExist) {
      this.entities.push(dto);
      return dto;
    }
    return isExist;
  }
}
