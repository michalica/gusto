import * as path from 'path';

abstract class AbstractCommand {
  public getAbsolutePath(relativePath: string, dirname: string): string {
    const { resolve } = path;

    return resolve(dirname, relativePath);
  }
}

export default AbstractCommand;
