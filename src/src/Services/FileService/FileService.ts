import * as fs from 'fs';
import * as fse from 'fs-extra';

class FileService implements FileServiceInterface {
  public readFile(
    fileName: string,
    successCallback: (text: string) => void
  ): void {
    fs.readFile(fileName, 'utf-8', (err, text) => {
      successCallback(text);
    });
  }

  public writeFile(fileName: string, data: string): void {
    fse.outputFile(fileName, data);
  }
}

export default FileService;

export interface FileServiceInterface {
  readFile(fileName: string, successCallback: (text: string) => void): void;
  writeFile(fileName: string, data: string): void;
}
