import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { BACKEND_ENV } from '@tfg-daw-basilio/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    //TODO: change this name into a environment variable
    transport: Transport.RMQ,
    options: {
      urls: [BACKEND_ENV.RABBITMQ_URL],
      queue: BACKEND_ENV.QUEUE.GATEWAY.NAME,
      queueOptions: {
        durable: true,
      },
    },
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
