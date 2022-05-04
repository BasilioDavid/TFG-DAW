import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BACKEND_ENV } from '@tfg-daw-basilio/environment';
import { GatewayController } from './core/modules/gateway.controller';

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
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [],
})
export class AppModule {}
