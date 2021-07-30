import {
  CommandInterface,
  CommandRegister,
} from '../../src/CommandLine/CommandLine';
import CommandRegistry from '../../src/CommandRegistry';
import Log from '../../src/Services/Log';

class Help implements CommandInterface {
  public execute(): void {
    Log.writeOrange('Available commands:');
    Log.writeOrange('-------------------');

    CommandRegistry.getCommandRegistry()
      .registry()
      .forEach((command: CommandRegister) => {
        const [name, instance] = Object.entries(command)[0];

        const description =
          Object.getPrototypeOf(instance).constructor.description;

        if (description) {
          Log.write(`${name} - ${description}`);

          return;
        }

        Log.write(name);
      });
  }
}

export default Help;
