import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BACKEND_ENV } from '@tfg-daw-basilio/environment';
import { AuthController } from './core/modules/auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        //TODO: change this name into a environment variable
        name: 'DISPATCHER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [BACKEND_ENV.RABBITMQ_URL],
          queue: BACKEND_ENV.QUEUE.DISPATCHER.NAME,
          queueOptions: {
            //TODO: check if i want transient queue
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
