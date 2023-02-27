import { createWriteStream } from 'fs';
import { EOL } from 'os';
import { normalize } from 'path';

export class WriteFsService {
  file;
  fileSize;
  fileNameTemplate;
  maxFileSize;

  constructor(fileName: string) {
    this.maxFileSize = process.env.MAX_FILE_SIZE ?? 1024;
    this.maxFileSize *= 1024;
    this.fileNameTemplate = fileName;
    this.createNewFile(this.fileNameTemplate);
  }

  createNewFile(fileName: string) {
    const newFileName = fileName.replace(
      '.log',
      `-${this.getDateString()}.log`,
    );
    try {
      this.file = createWriteStream(normalize(newFileName), {
        flags: 'a',
      });
      this.fileSize = 0;
    } catch (err) {
      console.log(err);
    }
  }

  writeToFile(data: any, context?: string) {
    let chunk = '';
    if (context) {
      chunk += context + ': ';
    }
    try {
      chunk += typeof data === 'string' ? data : JSON.stringify(data);
      chunk += EOL;
      const increment = this.fileSize + chunk.length;

      if (increment > this.maxFileSize) {
        this.createNewFile(this.fileNameTemplate);
        this.file.write(chunk);
        this.fileSize = chunk.length;
      } else {
        this.file.write(chunk);
        this.fileSize = increment;
      }
    } catch (err) {
      console.log(err);
    }
  }

  getDateString() {
    const d = new Date();
    const year = d.getFullYear().toString();
    const month = d.getMonth().toString().padStart(2, '0');
    const day = d.getDay().toString().padStart(2, '0');
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  }
}
