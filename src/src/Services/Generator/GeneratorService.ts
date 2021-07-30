import * as ejs from 'ejs';
import FileService from '../FileService';
import { exec } from 'child_process';

class GeneratorService implements GeneratorServiceInterface {
  constructor(
    private fileService: FileService = new FileService(),
    private _template: string | null = null
  ) {}

  public setTemplate(template: string): void {
    this._template = template;
  }

  public render(targetPath: string, data: { [key: string]: string }): void {
    if (!this._template) {
      throw new Error(
        'Template is not defined. Use setTemplate(template: string) to define template'
      );
    }

    this.fileService.readFile(this._template, (templateFromFile: string) => {
      const d = ejs.render(templateFromFile, data);

      this.fileService.writeFile(targetPath, d);
      this.fixLint(targetPath);
    });
  }

  private fixLint(targetPath: string): void {
    exec(`npm run eslint -- --fix ${targetPath}`);
  }
}

export default GeneratorService;

export interface GeneratorServiceInterface {
  setTemplate(template: string): void;
  render(targetPath: string, data: { [key: string]: string }): void;
}
