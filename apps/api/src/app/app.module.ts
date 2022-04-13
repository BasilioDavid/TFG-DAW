import { Module } from '@nestjs/common';
import {FileManagerController} from "./core/file-manager/file-manager.controller";
import {FileSystemService} from "./shared/file-system/file-system.service";
import {env} from "./shared/enviroment/enviroment";
import {ENV} from "./shared/enviroment/env";

@Module({
  imports: [],
  controllers: [FileManagerController],
  providers: [FileSystemService,{
    provide: ENV,
    useValue: env,
  }],
})
export class AppModule {}
