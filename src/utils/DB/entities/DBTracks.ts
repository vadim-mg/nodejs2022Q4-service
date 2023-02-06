import * as crypto from 'node:crypto';
import { CreateTrackDto } from 'src/track/dto/create-Track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-Track.dto';
import { TrackEntity } from 'src/track/entities/Track.entity';
import DBEntity from './DBEntity';

export default class DBTracks extends DBEntity<
  TrackEntity,
  UpdateTrackDto,
  CreateTrackDto
> {
  async create(dto: CreateTrackDto) {
    const created: TrackEntity = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}
