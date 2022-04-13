import { Injectable } from '@nestjs/common';
import { readdir, stat, mkdir } from 'fs/promises';
import {ENV} from "../enviroment/env";

@Injectable()
export class FileSystemService {
  constructor(private readonly env: ENV) {}

  //TODO: create a way to get safe path
  async ls(path: any) {
    const list = {
      files: [],
      directories: [],
    };

    const elements = await readdir(`${this.env.PUBLIC_PATH}/${path}`);
    for (const element of elements) {
      const isFile = (await stat(`${this.env.PUBLIC_PATH}/${element}`)).isFile();
      list[isFile ? 'files' : 'directories'].push(element);
    }

    return list;
  }

  async mkdir(path: string, dirName: string) {
    await mkdir(`${this.env.PUBLIC_PATH}/${path}/${dirName}`);
  }
}
