import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { BACKEND_ENV } from '@tfg-daw-basilio/environment';
import { Payload } from '@tfg-daw-basilio/environment';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    //TODO: check if I want create a wrapper for that Class
    @Inject('DISPATCHER_SERVICE')
    private readonly dispatcherService: ClientProxy,
    private readonly authService: AuthService
  ) {}

  @EventPattern(BACKEND_ENV.QUEUE.AUTH.EVENT.LOGIN)
  async logUser(payload: Payload): Promise<unknown> {
    if (!payload.user || !payload.user.name || !payload.user.pass) {
      const responsePayload: Payload = {
        ...payload,
        rejected: {
          //TODO: warning with this code
          code: '402',
          reason: 'User or password empty',
        },
      };
      return this.dispatcherService.emit(
        BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS,
        responsePayload
      );
    }

    try {
      const user = this.authService.loginUser(
        payload.user.name,
        payload.user.pass
      );
      const responsePayload: Payload = {
        ...payload,
        user: {
          ...payload.user,
          name: user.name,
          pass: user.pass,
          valid: true,
          token: user.token,
          rol: user.rol,
        },
      };
      return this.dispatcherService.emit(
        BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS,
        responsePayload
      );
    } catch (e) {
      //TODO: use error message
      const responsePayload: Payload = {
        ...payload,
        rejected: {
          //TODO: warning with this code
          code: '402',
          reason: 'User or password incorrect',
        },
      };
      return this.dispatcherService.emit(
        BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS,
        responsePayload
      );
    }
  }

  @EventPattern(BACKEND_ENV.QUEUE.AUTH.EVENT.REGISTER)
  registerUser(payload: Payload): unknown {
    if (!payload.user || !payload.user.name || !payload.user.pass) {
      const responsePayload: Payload = {
        ...payload,
        rejected: {
          //TODO: warning with this code
          code: '402',
          reason: 'User or password empty',
        },
      };
      return this.dispatcherService.emit(
        BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS,
        responsePayload
      );
    }

    try {
      const user = this.authService.registerUser(
        payload.user.name,
        payload.user.pass
      );
      const responsePayload: Payload = {
        ...payload,
        user: {
          ...payload.user,
          name: user.name,
          pass: user.pass,
          valid: true,
          token: user.token,
          rol: user.rol,
        },
      };
      return this.dispatcherService.emit(
        BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS,
        responsePayload
      );
    } catch (e) {
      const responsePayload: Payload = {
        ...payload,
        rejected: {
          //TODO: warning with this code
          code: '402',
          reason: 'User or password incorrect',
        },
      };
      return this.dispatcherService.emit(
        BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS,
        responsePayload
      );
    }
  }

  @EventPattern(BACKEND_ENV.QUEUE.AUTH.EVENT.VALIDATE)
  async validateUser(payload: Payload): Promise<unknown> {
    if (!payload.user || !payload.user.token) {
      const responsePayload: Payload = {
        ...payload,
        rejected: {
          //TODO: warning with this code
          code: '402',
          reason: 'Token empty',
        },
      };
      return this.dispatcherService.emit(
        BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS,
        responsePayload
      );
    }

    const user = await this.authService.checkToken(payload.user.token);
    const responsePayload: Payload = !user
      ? {
          ...payload,
          rejected: {
            code: '32032',
            reason: 'User or password incorrect',
          },
        }
      : {
          ...payload,
          user: {
            name: user.name,
            pass: user.pass,
            valid: true,
            token: user.token,
            rol: user.rol,
          },
        };
    return this.dispatcherService.emit(
      BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS,
      responsePayload
    );
  }
}
