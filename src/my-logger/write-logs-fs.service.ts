import { WriteFsService } from './frite-fs.service';

export class WriteLogsFsService extends WriteFsService {
  private static _instance: WriteLogsFsService;

  static getInstance(fileName: string) {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new WriteLogsFsService(fileName);
  }
}

export class WriteErrorsFsService extends WriteFsService {
  private static _instance: WriteErrorsFsService;

  static getInstance(fileName: string) {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new WriteErrorsFsService(fileName);
  }
}
