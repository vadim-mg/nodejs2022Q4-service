import { CreateFavDto } from 'src/favs/dto/create-favs.dto';
import { UpdateFavDto } from 'src/favs/dto/update-favs.dto';
import { FavsEntity } from 'src/favs/entities/favs.entity';
import DBEntity from './DBEntity';

export default class DBFav extends DBEntity<
  FavsEntity,
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
