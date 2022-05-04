import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { BACKEND_ENV, Payload } from '@tfg-daw-basilio/environment';

@Controller()
export class DispatcherController {
  constructor(
    //TODO: check if I want create a wrapper for that Class
    @Inject('GATEWAY_SERVICE') private readonly gatewayService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy
  ) {}

  @EventPattern(BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS)
  async dispatch(payload: Payload) {
    console.log(payload);
    if (payload.resolved) {
      return this.gatewayService.emit(
        BACKEND_ENV.QUEUE.GATEWAY.EVENT.OK,
        payload
      );
    }
    if (payload.rejected) {
      return this.gatewayService.emit(
        BACKEND_ENV.QUEUE.GATEWAY.EVENT.BAD,
        payload
      );
    }
    if (!payload.user.valid) {
      return this.authService.emit(BACKEND_ENV.QUEUE.AUTH.EVENT.CHECK, payload);
    }
  }
}
