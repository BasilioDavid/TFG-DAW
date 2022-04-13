import { Test, TestingModule } from '@nestjs/testing';
import { FileSystemService } from './file-system.service';
import {ENV} from "../enviroment/env";

describe('FileSystemService', () => {
  let service: FileSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileSystemService, {
        provide: ENV,
        useValue: {
          PUBLIC_PATH: "."
        }
      }],
    }).compile();

    service = module.get<FileSystemService>(FileSystemService);
  });

  it('should return a valid empty structure', async function () {
    const expected = {
      files: [],
      directories: [],
    };
    const result = await service.ls("uknownPath");

    expect(result).toEqual(expected);
  });

  it('should return some files and directories', async function () {
    const result = await service.ls(".");

    expect(result.files.length).toBeGreaterThan(0);
    expect(result.directories.length).toBeGreaterThan(0);
  });
});
