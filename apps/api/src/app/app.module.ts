import { Module } from '@nestjs/common';
import { FileManagerController } from './core/modules/file-manager/file-manager.controller';
import { FileSystemService } from './common/file-system/file-system.service';
import { env } from './common/enviroment/enviroment';
import { ENV } from './common/enviroment/env';

@Module({
  imports: [],
  controllers: [FileManagerController],
  providers: [
    FileSystemService,
    {
      provide: ENV,
      useValue: env,
    },
  ],
})
export class AppModule {}
