import DBUsers from './entities/DBUsers';
import * as lodash from 'lodash';
import DBArtists from './entities/DBArtists';
import DBAlbums from './entities/DBAlbums';
import DBTracks from './entities/DBTracks';

export class DbService {
  users = new DBUsers();
  artists = new DBArtists();
  albums = new DBAlbums();
  tracks = new DBTracks();

  constructor() {
    const deepCopyResultTrap: ProxyHandler<any> = {
      get: (target, prop) => {
        if (typeof target[prop] === 'function') {
          return (...args: any[]) => {
            const result = target[prop](...args);
            if (result instanceof Promise) {
              return result.then((v) => lodash.cloneDeep(v));
            }
            return lodash.cloneDeep(result);
          };
        } else {
          return target[prop];
        }
      },
    };
    for (const [k, v] of Object.entries(this)) {
      this[k as keyof typeof this] = new Proxy(v, deepCopyResultTrap);
    }
  }
}

const db = new DbService();
export { db };
