import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BACKEND_ENV } from '@tfg-daw-basilio/environment';
import { DispatcherController } from './core/modules/dispatcher.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        //TODO: change this name into a environment variable
        name: 'GATEWAY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [BACKEND_ENV.RABBITMQ_URL],
          queue: BACKEND_ENV.QUEUE.GATEWAY.NAME,
          queueOptions: {
            //TODO: check if i want transient queue
            durable: true,
          },
        },
      },
      {
        //TODO: change this name into a environment variable
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [BACKEND_ENV.RABBITMQ_URL],
          queue: BACKEND_ENV.QUEUE.AUTH.NAME,
          queueOptions: {
            //TODO: check if i want transient queue
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [DispatcherController],
  providers: [],
})
export class AppModule {}
