import * as chalk from 'chalk';

// eslint-disable-next-line no-console
const write = console.log;

class Log {
  public static writeOrange(text: string): void {
    write(chalk.hex('#FF6633')(text));
  }

  public static write(text: string): void {
    write(text);
  }
}

export default Log;
