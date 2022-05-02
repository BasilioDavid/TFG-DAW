import { Controller, Get, Inject, Module, Query } from '@nestjs/common';
import {
  ClientProxy,
  ClientsModule,
  EventPattern,
  Transport,
} from '@nestjs/microservices';

@Controller('test')
class TestController {
  constructor(@Inject('AUTH_SERVICE') private auth: ClientProxy) {}

  @Get('')
  post(@Query() query: any) {
    console.log(query);
    this.auth.emit<string>('check', { ...query });
    return 'bien';
  }

  @EventPattern('response_ok')
  async responseOk(data: string) {
    console.log('Oleee');
    console.log(data);
  }

  @EventPattern('response_bad')
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
          urls: ['amqp://localhost:5672'],
          //TODO: search a way to change into a environment variable
          queue: 'auth_queue',
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
