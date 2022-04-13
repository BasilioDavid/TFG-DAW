import { Controller, Get, Param, Post } from '@nestjs/common';
import { FileSystemService } from '../../shared/file-system/file-system.service';

@Controller('file-manager')
export class FileManagerController {
  public constructor(private readonly fileSystem: FileSystemService) {}

  @Get('ls/:path')
  public ls(@Param("path") path: string) {
    console.log(path)
    return this.fileSystem.ls(path);
  }

  @Get('mkdir/:path/:dirName')
  public mkdir(@Param("path") path: string, @Param("dirName") dirName: string) {
    return this.fileSystem.mkdir(path, dirName);
  }
}
