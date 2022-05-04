import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { BACKEND_ENV } from '@tfg-daw-basilio/environment';
import { Payload } from '@tfg-daw-basilio/environment';

@Controller()
export class AuthController {
  constructor(
    //TODO: check if I want create a wrapper for that Class
    @Inject('DISPATCHER_SERVICE')
    private readonly dispatcherService: ClientProxy
  ) {}

  @EventPattern(BACKEND_ENV.QUEUE.AUTH.EVENT.CHECK)
  async logUser(payload: Payload) {
    const responsePayload: Payload =
      payload.user.name === payload.user.pass
        ? {
            ...payload,
            user: {
              ...payload.user,
              valid: true,
              token: 'unTokenValido',
            },
            resolved: {
              code: '202',
              data: Date(),
            },
          }
        : {
            ...payload,
            rejected: {
              code: '402',
              reason: 'Password and user wrong',
            },
          };

    this.dispatcherService.emit(
      BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS,
      responsePayload
    );
  }
}
