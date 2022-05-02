import { Controller, Get, Inject, Module } from '@nestjs/common';
import {
  ClientProxy,
  ClientsModule,
  EventPattern,
  Transport,
} from '@nestjs/microservices';

@Controller('test')
class TestController {
  constructor(
    @Inject('RESPONSE_SERVICE') private readonly responseService: ClientProxy
  ) {}
  @EventPattern('check')
  async checkUser({ user, pass }: { user: string; pass: string }) {
    if (user === pass) {
      console.log('bien');
      this.responseService.emit('response_ok', 'tokenOK');
    } else {
      console.log('mal');
      this.responseService.emit('response_bad', 'tokenBad');
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
          urls: ['amqp://localhost:5672'],
          //TODO: search a way to change into a environment variable
          queue: 'response_queue',
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
