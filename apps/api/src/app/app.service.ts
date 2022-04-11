import { Injectable } from '@nestjs/common';
import { Message } from '@tfg-daw-basilio/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
