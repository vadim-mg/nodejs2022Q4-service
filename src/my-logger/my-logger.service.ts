import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    // todo saveToFile
    super.log(message);
  }

  error(message: any, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(message: unknown, context?: unknown, ...rest: unknown[]): void {
    // todo saveToFile
    super.error(message);
  }

  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: any[]): void;
  warn(message: unknown, context?: unknown, ...rest: unknown[]): void {
    // todo saveToFile
    super.warn(message);
  }

  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: any[]): void;
  debug(message: unknown, context?: unknown, ...rest: unknown[]): void {
    // todo saveToFile
    super.debug(message);
  }

  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: any[]): void;
  verbose(message: unknown, context?: unknown, ...rest: unknown[]): void {
    // todo saveToFile
    super.verbose(message);
  }
}
