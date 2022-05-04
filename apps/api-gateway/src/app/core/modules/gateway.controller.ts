import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { BACKEND_ENV } from '@tfg-daw-basilio/environment';
import { Payload } from '@tfg-daw-basilio/environment';

@Controller('test')
export class GatewayController {
  constructor(
    @Inject('DISPATCHER_SERVICE') private dispatcherService: ClientProxy
  ) {}

  @Get('login')
  login(@Query() { user: name, pass }: { user: string; pass: string }) {
    const payload: Payload = {
      user: {
        valid: false,
        name,
        pass,
      },
      ended: false,
    };

    this.dispatcherService.emit<object>(
      BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS,
      payload
    );
    return 200;
  }

  @EventPattern(BACKEND_ENV.QUEUE.GATEWAY.EVENT.OK)
  async responseOk(payload: Payload) {
    console.log('Oleee');
  }

  @EventPattern(BACKEND_ENV.QUEUE.GATEWAY.EVENT.BAD)
  async responseBad(payload: Payload) {
    console.log('vaia');
  }
}
