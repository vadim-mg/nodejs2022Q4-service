import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new MyLoggerService(`Logger, request`);

  use(req: Request, res: Response, next: () => void) {
    res.on('close', () => {
      let message =
        `${req.method} ${req.originalUrl}` +
        ` params: ${JSON.stringify(req.params)}   CODE: ${res.statusCode}`;

      if (req.body) {
        message += ` BODY: ${JSON.stringify(req.body)}`;
      }

      if (res.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) {
        return this.logger.error(message);
      }

      if (res.statusCode >= StatusCodes.BAD_REQUEST) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });
    next();
  }
}
