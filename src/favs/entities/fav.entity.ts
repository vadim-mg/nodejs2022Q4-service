export enum FavTypes {
  artist = 'artist',
  album = 'album',
  track = 'track',
}

export class FavEntity {
  id: string;
  type: FavTypes;
}
