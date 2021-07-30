import { Project, SourceFile } from 'ts-morph';

class Ast {
  private static ast: Ast | null = null;

  private project: Project = new Project({
    tsConfigFilePath: 'tsconfig.json',
  });

  public static getAst(): Ast {
    if (!Ast.ast) {
      Ast.ast = new Ast();
    }

    return Ast.ast;
  }

  public getSourceFilesByPattern(pattern: string[]): SourceFile[] {
    return this.project.getSourceFiles(pattern);
  }

  public getSourceFileByPath(string: string): SourceFile {
    return this.project.getSourceFileOrThrow(string);
  }
}

export default Ast;
