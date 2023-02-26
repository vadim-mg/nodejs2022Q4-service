import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filtres/allException.filter';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaService } from './prisma.service';

const PORT = process.env.PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const myLoggerService = new MyLoggerService(AppModule.name, {
    logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.useLogger(myLoggerService);

  const config = new DocumentBuilder()
    .setTitle('Library IPI')
    .setDescription('The library API description')
    .setVersion('1.0')
    .build();

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: true,
    deepScanRoutes: true,
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());

  process.on('uncaughtException', async (err: Error) => {
    myLoggerService.specialError('uncaughtException', err, async () => {
      console.log('Application is closing...');
      await app.close();
      console.log('Application was closed with error. See error log file!');
    });
  });

  process.on('unhandledRejection', async (err: Error) => {
    myLoggerService.specialError('unhandledRejection', err, () => '');
  });

  await app.listen(PORT, () =>
    console.log(`Service started on Port:  ${PORT}`),
  );
}
bootstrap();
