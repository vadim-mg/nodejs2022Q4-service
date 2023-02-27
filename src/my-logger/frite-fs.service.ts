import { createWriteStream } from 'fs';
import { EOL } from 'os';
import { normalize } from 'path';

export class WriteFsService {
  file;

  constructor(fileName) {
    try {
      this.file = createWriteStream(normalize(fileName), {
        flags: 'a',
      });
    } catch (err) {
      console.log(err);
    }
  }

  writeToFile(data: any, context?: string) {
    if (context) {
      this.file.write(context + ': ');
    }
    try {
      if (typeof data === 'string') {
        this.file.write(data);
      } else {
        this.file.write(JSON.stringify(data));
      }
      this.file.write(EOL);
    } catch (err) {
      console.log(err);
    }
  }
}
