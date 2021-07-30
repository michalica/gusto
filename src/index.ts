import CommandLine from './src/CommandLine/CommandLine';
import CommandRegistry from './src/CommandRegistry';
import { AbstractCommand } from './src/CommandLine/commands';
import { CommandInterface } from './src/CommandLine/CommandLine';
import GeneratorService from './src/Services/Generator';
import AbstractGenerator from './src/CommandLine/generators';
import Ast from './src/Services/Ast';
import FileService from './src/Services/FileService';
import Log from './src/Services/Log';
import { InterfaceDeclarationStructure, Scope } from 'ts-morph';
import { CommandRegister } from './src/CommandLine/CommandLine';

export {
  CommandLine,
  CommandRegistry,
  AbstractCommand,
  CommandInterface,
  GeneratorService,
  AbstractGenerator,
  Ast,
  FileService,
  Log,
  InterfaceDeclarationStructure,
  Scope,
  CommandRegister,
};
