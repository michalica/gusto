import * as commander from 'commander';

export interface CommandLineCommandInterface<
  Questions = unknown,
  Answers = unknown
> {
  getCommander(): commander.Command;
  setCommander(value: commander.Command): void;
  getCurrentDirectory(): string | null;
  setCurrentDirectory(value: string | null): void;
  setOptions(flags: string, description?: string, defaultValue?: string): void;
  setUserPromptQuestions(questions: Questions): Promise<void>;
  getAnswers(): null | Answers;
}
