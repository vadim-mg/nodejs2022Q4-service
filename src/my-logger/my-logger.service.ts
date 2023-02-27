import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  WriteErrorsFsService,
  WriteLogsFsService,
} from './write-logs-fs.service';
const ERROR_FILE_NAME = '/usr/app/src/runtime/error.log';
const REQUEST_FILE_NAME = '/usr/app/src/runtime/requests.log';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  writeLogFsService;
  writeErrorsFsService;

  constructor(context, options) {
    super(context, options);
    this.writeLogFsService = WriteLogsFsService.getInstance(REQUEST_FILE_NAME);
    this.writeErrorsFsService = WriteErrorsFsService.getInstance(ERROR_FILE_NAME);
  }

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.writeLogFsService.writeToFile(message, context);
    super.log(message, context);
  }

  error(message: any, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.writeLogFsService.writeToFile(message, context);
    this.writeErrorsFsService.writeToFile(message, context);
    super.error(message, context);
  }

  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: any[]): void;
  warn(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.writeLogFsService.writeToFile(message, context);
    this.writeErrorsFsService.writeToFile(message, context);
    super.warn(message, context);
  }

  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: any[]): void;
  debug(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.writeLogFsService.writeToFile(message, context);
    super.debug(message, context);
  }

  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: any[]): void;
  verbose(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.writeLogFsService.writeToFile(message, context);
    super.verbose(message, context);
  }

  specialError(name: string, err: Error, cb: () => void): void {
    const message = {
      message: `${name}: ${err.message}`,
      stack: err.stack,
    };
    this.error(message, 'specError');
    cb();
  }
}
