import { CommandRegister, CommandInterface } from '../CommandLine/CommandLine';

class CommandRegistry implements CommandRegistryInterface {
  public static commandRegistry: CommandRegistry | null = null;
  private _registry: CommandRegister[] = [];

  private constructor() {
    return;
  }

  public static getCommandRegistry(): CommandRegistry {
    if (!CommandRegistry.commandRegistry) {
      CommandRegistry.commandRegistry = new CommandRegistry();
    }

    return CommandRegistry.commandRegistry;
  }

  public registry(): CommandRegister[] {
    return this._registry;
  }

  public addCommand(name: string, script: CommandInterface): void {
    this._registry.push({
      [name]: script,
    });
  }

  public getCommand(name: string): CommandInterface | null {
    const command = this._registry.find((script: CommandRegister) => {
      return Boolean(script[name]);
    });

    return command?.[name] || null;
  }

  public resetRegistry(): void {
    this._registry = [];
  }
}

export default CommandRegistry;

export interface CommandRegistryInterface {
  getCommand(name: string): CommandInterface | null;
  addCommand(name: string, script: CommandInterface): void;
  resetRegistry(): void;
  registry(): CommandRegister[];
}
