import AbstractGenerator from '../AbstractGenerator';
import Command from '../../commands/Command/Command';
import * as path from 'path';
import { CommandInterface, CommandOptionsInterface } from '../../CommandLine';

const questions = [
  {
    type: 'input',
    name: 'componentName',
    message: "What's your component name?",
  },
];

export type Questions = typeof questions;

type Answers = {
  componentName: string;
};

class ComponentGenerator
  extends AbstractGenerator
  implements CommandInterface<Answers>
{
  public static TEMPLATE = './template.ejs';
  public static INDEX = './index.ejs';
  public static INDEX_STYLES = './index.styles.ejs';

  private _currentDirectory: string | null = null;

  public async init(command: Command<Questions, Answers>): Promise<void> {
    this._currentDirectory = command.getCurrentDirectory();

    await command.setUserPromptQuestions([
      {
        type: 'input',
        name: 'componentName',
        message: "What's your component name?",
      },
    ]);
  }

  public execute(
    args: string[],
    opts: CommandOptionsInterface,
    answers: Answers
  ): void {
    const componentName = answers.componentName;

    this.renderComponent(componentName);
    this.renderIndex(componentName);
    this.renderStyles(componentName);
  }

  private renderComponent(componentName: string): void {
    const componentTemplatePath = path.resolve(
      __dirname,
      ComponentGenerator.TEMPLATE
    );

    const componentTargetPath = path.resolve(
      this._currentDirectory || '',
      `${componentName}/${componentName}.tsx`
    );

    this.render(componentTemplatePath, componentTargetPath, {
      ComponentName: componentName,
    });
  }

  private renderIndex(componentName: string): void {
    const indexTemplatePath = path.resolve(__dirname, ComponentGenerator.INDEX);
    const indexTargetPath = path.resolve(
      this._currentDirectory || '',
      `${componentName}/index.ts`
    );

    this.render(indexTemplatePath, indexTargetPath, {
      ComponentName: componentName,
    });
  }

  private renderStyles(componentName: string): void {
    const stylesTemplatePath = path.resolve(
      __dirname,
      ComponentGenerator.INDEX_STYLES
    );
    const stylesTargetPath = path.resolve(
      this._currentDirectory || '',
      `${componentName}/index.styles.tsx`
    );

    this.render(stylesTemplatePath, stylesTargetPath, {
      ComponentName: componentName,
    });
  }
}

export default ComponentGenerator;
