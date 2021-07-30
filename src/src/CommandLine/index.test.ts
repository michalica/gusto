import CommandLine from './CommandLine';
import Command from './commands/Command/Command';
import { CommandLineCommandInterface } from './commands/Command/CommandInterface';
import CommandRegistry from '../CommandRegistry';
import { CommandRegistryInterface } from '../CommandRegistry/CommandRegistry';
import TestClass from '@michalicat/test-class/lib';

describe('assertion testing', () => {
  it('should exist', () => {
    const commandLine = new CommandLine();

    expect(commandLine).toBeInstanceOf(CommandLine);
  });

  it('should call run correctly, when script does exist', async () => {
    const commandInterface = {
      execute: jest.fn(),
      init: jest.fn(),
    };
    const parse = jest.fn();
    const opts = jest.fn();
    const INIT_CWD = '/test';

    const arg = ['node', 's', 'command'];

    process.argv = arg;
    process.env.INIT_CWD = INIT_CWD;

    const {
      instance: testCommandRegistry,
      methodsToMockMap: testMethodsToMockMap,
    } = TestClass.testClassFor<CommandRegistry, CommandRegistryInterface>(
      CommandRegistry.getCommandRegistry(),
      {
        customMocks: {
          getCommand: jest.fn(() => commandInterface),
        },
      }
    );

    const {
      instance: testCommand,
      methodsToMockMap: testCommandMethodsToMockMap,
    } = TestClass.testClassFor<
      CommandLineCommandInterface,
      CommandLineCommandInterface
    >(new Command(), {
      customMocks: {
        getCommander: jest.fn(() => ({
          parse,
          args: ['argument'],
          opts,
        })),
      },
    });

    const commandLine = new CommandLine(testCommand, testCommandRegistry);

    await commandLine.run(['node', 's', 'command']);

    expect(commandLine).toBeInstanceOf(CommandLine);
    expect(testMethodsToMockMap.getCommand).toBeCalledTimes(1);
    expect(testMethodsToMockMap.getCommand).toHaveBeenCalledWith('command');
    expect(
      testCommandMethodsToMockMap.setCurrentDirectory
    ).toHaveBeenCalledWith(INIT_CWD);
    expect(commandInterface.init).toBeCalledTimes(1);
    expect(testCommandMethodsToMockMap.getCommander).toBeCalledTimes(3);
    expect(parse).toHaveBeenCalledWith(arg);
    expect(opts).toBeCalledTimes(1);
    expect(testCommandMethodsToMockMap.getAnswers).toHaveBeenCalled();
  });
});
