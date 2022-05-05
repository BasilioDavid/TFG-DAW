import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BACKEND_ENV, Payload } from '@tfg-daw-basilio/environment';

export class DispatcherService {
  constructor(
    //TODO: check if I want create a wrapper for Proxy Client
    @Inject('GATEWAY_SERVICE') private readonly gatewayService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy
  ) {}

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
