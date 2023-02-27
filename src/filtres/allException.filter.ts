import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger = new MyLoggerService(AllExceptionFilter.name);

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server Error!!';

    const errorLogMessage = {
      statusCode: httpStatus,
      error: errorMessage,
      method: request.method,
      url: request.url,
      timeStamp: new Date(),
    };

    if (httpStatus >= StatusCodes.INTERNAL_SERVER_ERROR) {
      errorLogMessage['exception'] = exception.stack;
      this.logger.error(errorLogMessage, AllExceptionFilter.name);
    } else if (httpStatus >= StatusCodes.BAD_REQUEST) {
      this.logger.warn(errorLogMessage, AllExceptionFilter.name);
    } else {
      this.logger.log(errorLogMessage, AllExceptionFilter.name);
    }

    response.status(httpStatus).json(errorMessage);
    return;
  }
}
