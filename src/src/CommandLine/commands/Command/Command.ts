import { Command as CommanderCommand } from 'commander';
import * as commander from 'commander';
import * as inquirer from 'inquirer';
import { CommandLineCommandInterface } from './CommandInterface';

class Command<Questions, Answers>
  implements CommandLineCommandInterface<Questions, Answers>
{
  private _commander = new CommanderCommand();
  private _currentDirectory: null | string = null;
  private _inquirer = inquirer;
  private _answers: Answers | null = null;

  public getCommander(): commander.Command {
    return this._commander;
  }

  public setCommander(value: commander.Command): void {
    this._commander = value;
  }

  public getCurrentDirectory(): string | null {
    return this._currentDirectory;
  }

  public setCurrentDirectory(value: string | null): void {
    this._currentDirectory = value;
  }

  public setOptions(
    flags: string,
    description?: string,
    defaultValue?: string
  ): void {
    this._commander.option(flags, description, defaultValue);
  }

  public async setUserPromptQuestions(questions: Questions): Promise<void> {
    try {
      const answers = await this._inquirer.prompt<Answers>(questions);
      this._answers = answers;
    } catch (e) {
      throw new Error(e);
    }
  }

  public getAnswers(): null | Answers {
    return this._answers;
  }
}

export default Command;
