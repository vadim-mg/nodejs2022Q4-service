import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new MyLoggerService(`Logger, request`);

  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
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

      return this.logger.log(message, LoggerMiddleware.name);
    });
    next();
  }
}
