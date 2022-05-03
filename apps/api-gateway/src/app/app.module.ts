import { Controller, Get, Inject, Module, Query } from '@nestjs/common';
import {
  ClientProxy,
  ClientsModule,
  EventPattern,
  Transport,
} from '@nestjs/microservices';
import { BACKEND_ENV } from '@tfg-daw-basilio/environment';

@Controller('test')
class TestController {
  constructor(@Inject('AUTH_SERVICE') private auth: ClientProxy) {}

  @Get('')
  post(@Query() query: object) {
    console.log(query);
    this.auth.emit<object>(BACKEND_ENV.QUEUE.AUTH.EVENT.CHECK, { ...query });
    return 'bien';
  }

  @EventPattern(BACKEND_ENV.QUEUE.RESPONSE.EVENT.OK)
  async responseOk(data: string) {
    console.log('Oleee');
    console.log(data);
  }

  @EventPattern(BACKEND_ENV.QUEUE.RESPONSE.EVENT.BAD)
  async responseBad(data: string) {
    console.log('vaia');
    console.log(data);
  }
}

@Module({
  imports: [
    ClientsModule.register([
      //CON ESTO LO HAGO EMITIDOR DE EVENTOS
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [BACKEND_ENV.RABBITMQ_URL],
          //TODO: search a way to change into a environment variable
          queue: BACKEND_ENV.QUEUE.AUTH.NAME,
          queueOptions: {
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
