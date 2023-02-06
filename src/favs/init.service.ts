import { Injectable } from '@nestjs/common';
import { db } from 'src/utils/DB/db.service';
import { FavsTypes } from './entities/favs.entity';

@Injectable()
export class InitTestData {
  constructor() {
    if (process.env.CREATE_TEST_DATA === 'true') {
      this.init();
    }
  }
  async init() {
    const artist1 = await db.artists.create({
      name: 'artist1',
      grammy: false,
    });
    const artist2 = await db.artists.create({
      name: 'artist2',
      grammy: true,
    });
    const artist3 = await db.artists.create({
      name: 'artist3',
      grammy: true,
    });
    const album1 = await db.albums.create({
      name: 'album1',
      year: 43,
      artistId: artist1.id,
    });
    const album2 = await db.albums.create({
      name: 'album2',
      year: 53,
      artistId: artist2.id,
    });
    const album3 = await db.albums.create({
      name: 'album3',
      year: 3,
      artistId: artist3.id,
    });
    const track1 = await db.tracks.create({
      name: 'track1',
      artistId: artist1.id,
      albumId: album1.id,
      duration: 35,
    });
    const track2 = await db.tracks.create({
      name: 'track2',
      artistId: artist1.id,
      albumId: album1.id,
      duration: 35,
    });
    const track3 = await db.tracks.create({
      name: 'track3',
      artistId: artist1.id,
      albumId: album1.id,
      duration: 35,
    });

    await db.favs.create({
      type: FavsTypes.artist,
      id: artist1.id,
    });
    await db.favs.create({
      type: FavsTypes.artist,
      id: artist2.id,
    });
    await db.favs.create({
      type: FavsTypes.album,
      id: album1.id,
    });
    await db.favs.create({
      type: FavsTypes.track,
      id: track1.id,
    });

    return '';
  }
}
