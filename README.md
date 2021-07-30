# testclass

Gusto is node.js based library which helps developers to easily write Code generators or analyzers.
Code can be generated with EJS templates or dynamically using AST.


## Install

```bash
npm install -D @michalicat/gusto
```

or

```bash
yarn add -D @michalicat/gusto
```

## Usage

gusto.config.js in the root of your project:

```js
const register = CommandRegistry.getCommandRegistry();

register.addCommand('my:cutom:command', new ExampleCommand());

const commandLine = new CommandLine();

commandLine.run(process.argv);
```

## Example of Code generator using Templates (ejs)

```ts

class ComponentGenerator extends AbstractGenerator implements CommandInterface<Answers> {
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

  public execute(args: string[], opts: CommandOptionsInterface, answers: Answers): void {
    const componentName = answers.componentName;

    this.renderComponent(componentName);
    this.renderIndex(componentName);
    this.renderStyles(componentName);
  }

  private renderComponent(componentName: string): void {
    const componentTemplatePath = path.resolve(__dirname, ComponentGenerator.TEMPLATE);

    const componentTargetPath = path.resolve(this._currentDirectory || '', `${componentName}/${componentName}.tsx`);

    this.render(componentTemplatePath, componentTargetPath, {
      ComponentName: componentName,
    });
  }

  private renderIndex(componentName: string): void {
    const indexTemplatePath = path.resolve(__dirname, ComponentGenerator.INDEX);
    const indexTargetPath = path.resolve(this._currentDirectory || '', `${componentName}/index.ts`);

    this.render(indexTemplatePath, indexTargetPath, {
      ComponentName: componentName,
    });
  }

  private renderStyles(componentName: string): void {
    const stylesTemplatePath = path.resolve(__dirname, ComponentGenerator.INDEX_STYLES);
    const stylesTargetPath = path.resolve(this._currentDirectory || '', `${componentName}/index.styles.tsx`);

    this.render(stylesTemplatePath, stylesTargetPath, {
      ComponentName: componentName,
    });
  }
}

export default ComponentGenerator;
```

template.ejs


```ts
import React, {
  Component,
  ReactElement,
} from 'react';


export interface I<%= ComponentName %>Props {
}
export interface I<%= ComponentName %>State {
}

class <%= ComponentName %> extends Component< I<%= ComponentName %>Props, I<%= ComponentName %>State >
  {
    public render(): ReactElement
{

  return (
    <>Hello World</>
);
}
}


export default  <%= ComponentName %>;
```
index.ejs

```ts
import <%= ComponentName %> from './<%= ComponentName %>';

export default  <%= ComponentName %>;
```

Your package.json:

```json
...
{
  "scripts": {
    ...
    "gusto": "node gusto.config",
    ...
  }
}
...

```

## Example of code analyzer/linter

// TODO: Write docs.
