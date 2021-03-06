import { Injectable } from '@nestjs/common';
import { readdir, stat, mkdir } from 'fs/promises';
import { ENV } from '../enviroment/env';

@Injectable()
export class FileSystemService {
  constructor(private readonly env: ENV) {}

  async ls(path: any) {
    const list = {
      files: [],
      directories: [],
    };

    try {
      const elements = await readdir(`${this.env.PUBLIC_PATH}/${path}`);
      for (const element of elements) {
        const isFile = (
          await stat(`${this.env.PUBLIC_PATH}/${path}/${element}`)
        ).isFile();
        list[isFile ? 'files' : 'directories'].push(element);
      }
    } catch (e) {
      //TODO: change this into a logger service
      console.log(e);
    }
    return list;
  }

  async touch(path: string, dirName: string) {
    try {
      await `${this.env.PUBLIC_PATH}/${path}/${dirName}`;
      return true;
    } catch (e) {
      //TODO: change this into a logger service
      console.log(e);
      return false;
    }
  }

  async mkdir(path: string, dirName: string) {
    try {
      await mkdir(`${this.env.PUBLIC_PATH}/${path}/${dirName}`);
      return true;
    } catch (e) {
      //TODO: change this into a logger service
      console.log(e);
      return false;
    }
  }
}
