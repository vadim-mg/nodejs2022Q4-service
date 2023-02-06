export enum FavsTypes {
  artist = 'artist',
  album = 'album',
  track = 'track',
}

export class FavsEntity {
  id: string;
  type: FavsTypes;
}
