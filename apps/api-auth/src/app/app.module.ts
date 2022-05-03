import { Controller, Get, Inject, Module } from '@nestjs/common';
import {
  ClientProxy,
  ClientsModule,
  EventPattern,
  Transport,
} from '@nestjs/microservices';
import { BACKEND_ENV } from '@tfg-daw-basilio/environment';

@Controller('test')
class TestController {
  constructor(
    @Inject('RESPONSE_SERVICE') private readonly responseService: ClientProxy
  ) {}

  @EventPattern(BACKEND_ENV.QUEUE.AUTH.EVENT.CHECK)
  async checkUser({ user, pass }: { user: string; pass: string }) {
    if (user === pass) {
      console.log('bien');
      this.responseService.emit(BACKEND_ENV.QUEUE.RESPONSE.EVENT.OK, 'tokenOK');
    } else {
      console.log('mal');
      this.responseService.emit(
        BACKEND_ENV.QUEUE.RESPONSE.EVENT.BAD,
        'tokenBad'
      );
    }
  }
}

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RESPONSE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [BACKEND_ENV.RABBITMQ_URL],
          queue: BACKEND_ENV.QUEUE.RESPONSE.NAME,
          queueOptions: {
            //TODO: check if i want transient queue
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [TestController],
  providers: [],
})
export class AppModule {}
