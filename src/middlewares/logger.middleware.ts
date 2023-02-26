import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new MyLoggerService(`Logger, request`);

  use(req: Request, res: Response, next: () => void) {
    res.on('close', () => {
      const message = {
        statusCode: res.statusCode,
        method: req.method,
        url: req.url,
        params: req.params,
      };

      if (req.body) {
        message['body'] = req.body;
        if (message['body'].password) {
          message['body'].password = '*'.repeat(
            message['body'].password.length,
          );
        }
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
