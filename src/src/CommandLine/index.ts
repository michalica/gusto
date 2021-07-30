import CommandLine from './CommandLine';
import ExampleScript from './examples/ExamplesScript';
import CommandRegistry from '../CommandRegistry/CommandRegistry';
import ComponentGenerator from './generators/examples/ComponentGenerator';

import Help from '../../cli/help';

const register = CommandRegistry.getCommandRegistry();

register.addCommand('example', new ExampleScript());
register.addCommand('generate:component', new ComponentGenerator());
register.addCommand('help', new Help());

const commandLine = new CommandLine();

commandLine.run(process.argv);

const hi = '';

export default hi;
