import CommandRegistry from '../CommandRegistry/CommandRegistry';
import Command from './commands/Command/Command';
import { CommandLineCommandInterface } from './commands/Command/CommandInterface';

class CommandLine {
  constructor(
    private command: CommandLineCommandInterface = new Command(),
    private scriptRegistry: CommandRegistry = CommandRegistry.getCommandRegistry()
  ) {}

  public async run(args: string[]): Promise<void> {
    const scriptName = args[2];
    let script = this.scriptRegistry.getCommand(scriptName);

    if (!script) {
      script = this.scriptRegistry.getCommand('help');
    }

    this.command.setCurrentDirectory(process.env.INIT_CWD || null);

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await script?.init?.(this.command);

    this.command.getCommander().parse(process.argv);

    script?.execute(
      this.command.getCommander().args,
      this.command.getCommander().opts(),
      this.command.getAnswers()
    );
  }
}

export default CommandLine;

export interface CommandInterface<Answers = unknown> {
  execute(
    args: string[],
    opts: CommandOptionsInterface,
    answers: Answers
  ): void;
  init?(command: CommandLineCommandInterface): void;
}

export interface CommandRegister {
  [key: string]: CommandInterface;
}

export interface CommandOptionsInterface {
  [key: string]: unknown;
}
