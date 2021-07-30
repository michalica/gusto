import CommandRegistry from './CommandRegistry';
import { CommandInterface } from '../CommandLine/CommandLine';

describe('assertion testing', () => {
  beforeEach(() => {
    CommandRegistry.getCommandRegistry().resetRegistry();
  });

  it('should exist', () => {
    const instance = CommandRegistry.getCommandRegistry();

    expect(instance).toBeInstanceOf(CommandRegistry);
  });

  it('should add command to register', () => {
    const instance = CommandRegistry.getCommandRegistry();
    const commandInterface: CommandInterface = {
      execute: jest.fn(),
      init: jest.fn(),
    };

    expect(instance['_registry'].length).toBe(0);
    instance.addCommand('test', commandInterface);

    expect(instance['_registry'].length).toBe(1);
  });

  it('should get null if register is empty', () => {
    const instance = CommandRegistry.getCommandRegistry();

    expect(instance.getCommand('test')).toBe(null);
  });

  it('should get command from registry', () => {
    const instance = CommandRegistry.getCommandRegistry();
    const commandInterface: CommandInterface = {
      execute: jest.fn(),
      init: jest.fn(),
    };

    instance.addCommand('test', commandInterface);

    expect(instance.getCommand('test')).toBe(commandInterface);
  });
});
