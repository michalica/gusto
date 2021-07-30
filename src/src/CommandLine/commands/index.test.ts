import { AbstractCommand } from './index';

class TestClass extends AbstractCommand {
  public execute(): void {
    return;
  }
}

describe('assertion testing', () => {
  it('should get absolute Path', () => {
    const instance = new TestClass();

    const dirname = '/fitfox/bin/CommandLine/commands';

    expect(instance.getAbsolutePath('../../index.ts', dirname)).toBe(
      '/fitfox/bin/index.ts'
    );
  });
});
