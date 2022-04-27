import { Response } from 'express';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { FileSystemService } from '../../../common/file-system/file-system.service';

@Controller('file-manager')
export class FileManagerController {
  public constructor(private readonly fileSystem: FileSystemService) {}

  @Get('ls')
  public ls(@Query('path') path: string) {
    return this.fileSystem.ls(path);
  }

  @Get('mkdir')
  public async mkdir(
    @Res() expressResponse: Response,
    @Query('path') path: string,
    @Query('dirName') dirName: string
  ) {
    const isOk = await this.fileSystem.mkdir(path, dirName);
    expressResponse.sendStatus(isOk ? 201 : 406);
  }

  @Get('touch')
  public async touch(
    @Res() expressResponse: Response,
    @Query('path') path: string,
    @Query('dirName') dirName: string
  ) {
    // const isOk = await this.fileSystem.touch();
    // expressResponse.sendStatus(isOk ? 201 : 406);
  }
}
