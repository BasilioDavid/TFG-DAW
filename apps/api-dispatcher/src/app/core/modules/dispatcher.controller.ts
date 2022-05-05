import { EventPattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { BACKEND_ENV, Payload } from '@tfg-daw-basilio/environment';
import { DispatcherService } from './dispatcher.service';

@Controller()
export class DispatcherController {
  constructor(private readonly dispatcherService: DispatcherService) {}

  @EventPattern(BACKEND_ENV.QUEUE.DISPATCHER.EVENT.PROCESS)
  async dispatch(payload: Payload) {
    return this.dispatcherService.dispatch(payload);
  }
}
