import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  WriteErrorsFsService,
  WriteLogsFsService,
} from './write-logs-fs.service';
const ERROR_FILE_NAME = '/usr/app/src/runtime/error.log';
const REQUEST_FILE_NAME = '/usr/app/src/runtime/requests.log';
const NEST_LOG_LEVELS = ['log', 'error', 'warn', 'debug', 'verbose'];

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  writeLogFsService;
  writeErrorsFsService;
  additionalLogToConsole;

  constructor(context, options = {}) {
    const opt = options;
    opt['logLevels'] = [];
    if (typeof process.env.LOG_LEVEL !== 'undefined') {
      const level = Number(process.env.LOG_LEVEL);
      for (let i = 0; i < NEST_LOG_LEVELS.length && i < level; i++) {
        opt['logLevels'].push(NEST_LOG_LEVELS[i]);
      }
    }

    super(context, options);

    this.additionalLogToConsole =
      process.env.ADDITIONAL_LOG_TO_CONSOLE === 'true' ? true : false;

    this.writeLogFsService = WriteLogsFsService.getInstance(REQUEST_FILE_NAME);
    this.writeErrorsFsService =
      WriteErrorsFsService.getInstance(ERROR_FILE_NAME);
  }

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.writeLogFsService.writeToFile(message, context);
    if (this.additionalLogToConsole) super.log(message, context);
  }

  error(message: any, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.writeErrorsFsService.writeToFile(message, context);
    if (this.additionalLogToConsole) super.error(message, context);
  }

  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: any[]): void;
  warn(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.writeErrorsFsService.writeToFile(message, context);
    if (this.additionalLogToConsole) super.warn(message, context);
  }

  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: any[]): void;
  debug(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.writeLogFsService.writeToFile(message, context);
    if (this.additionalLogToConsole) super.debug(message, context);
  }

  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: any[]): void;
  verbose(message: unknown, context?: unknown, ...rest: unknown[]): void {
    this.writeLogFsService.writeToFile(message, context);
    if (this.additionalLogToConsole) super.verbose(message, context);
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