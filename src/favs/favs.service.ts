import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { db } from 'src/utils/DB/db.service';
import { FavTypes } from './entities/fav.entity';

const favTypeToDbName = (name: string) => name + 's';
@Injectable()
export class FavsService {
  async getAll() {
    const allFavs = {};
    allFavs[favTypeToDbName(FavTypes.artist)] = [];
    allFavs[favTypeToDbName(FavTypes.album)] = [];
    allFavs[favTypeToDbName(FavTypes.track)] = [];

    const all = await db.favs.findMany();

    for (const item of all) {
      const found = await db[favTypeToDbName(item.type)].findOne({
        key: 'id',
        equals: item.id,
      });
      if (found) {
        allFavs[favTypeToDbName(item.type)].push(found);
      }
    }

    return allFavs;
  }

  async add(createFavDto: CreateFavDto) {
    const found = await db[favTypeToDbName(createFavDto.type)].findOne({
      key: 'id',
      equals: createFavDto.id,
    });

    if (!found) {
      throw new HttpException(
        `UNPROCESSABLE_ENTITY: ${createFavDto.type} ${createFavDto.id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await db.favs.create(createFavDto);
  }

  async remove(id: string, type: FavTypes) {
    return await db.favs.delete(id);
  }
}
