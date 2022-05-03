import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BACKEND_ENV } from '@tfg-daw-basilio/environment';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [BACKEND_ENV.RABBITMQ_URL],
        queue: BACKEND_ENV.QUEUE.AUTH.NAME,
        queueOptions: {
          durable: true,
        },
      },
    }
  );
  app.listen();
}

bootstrap();
