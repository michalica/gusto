import AbstractCommand from '../commands/AbstractCommand';
import FileService from '../../Services/FileService';
import { CommandInterface, CommandOptionsInterface } from '../CommandLine';
import Command from '../commands/Command/Command';

const questions = [
  {
    type: 'confirm',
    name: 'toBeDelivered',
    message: 'Is this for delivery?',
    default: false,
  },
  {
    type: 'input',
    name: 'phone',
    message: "What's your phone number?",
  },
];

export type Questions = typeof questions;

export type Prompts = {
  toBeDelivered: boolean;
  phone: string;
};

class ExampleScript
  extends AbstractCommand
  implements CommandInterface<Prompts>
{
  private fileService: FileService = new FileService();

  public execute(
    args: string[],
    opts: CommandOptionsInterface,
    answers: Prompts
  ): void {
    this.fileService.readFile(
      this.getAbsolutePath('./textFile.txt', __dirname),
      text => {
        // eslint-disable-next-line no-console
        console.log(text, args, opts, answers);
      }
    );
  }

  public async init(command: Command<Questions, Prompts>): Promise<void> {
    command.setOptions('-example, -el', 'This is description of flag');
    await command.setUserPromptQuestions(questions);
  }
}

export default ExampleScript;
