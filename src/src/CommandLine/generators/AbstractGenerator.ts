import AbstractCommand from '../commands/AbstractCommand';
import { CommandInterface } from '../CommandLine';
import GeneratorService from '../../Services/Generator';

abstract class AbstractGenerator extends AbstractCommand {
  constructor(
    private _generatorService: GeneratorService = new GeneratorService()
  ) {
    super();
  }

  protected render(
    template: string,
    targetFolder: string,
    data: { [key: string]: string }
  ): void {
    this._generatorService.setTemplate(template);
    this._generatorService.render(targetFolder, data);
  }
}

export default AbstractGenerator;

export type GeneratorInterface = CommandInterface;
