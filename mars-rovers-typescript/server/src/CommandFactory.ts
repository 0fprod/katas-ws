import { Command } from "./interfaces/Command";
import { Backwards, Left, Right, Forward } from "./models";

export class CommandFactory {

  private constructor() { }

  static createCommands(rawCommands: string): Array<Command> {
    const commands: Array<Command> = [];

    rawCommands.split('').forEach((primitiveCommand: string) => {
      switch (primitiveCommand.toUpperCase()) {
        case 'F':
          commands.push(new Forward());
          break;
        case 'B':
          commands.push(new Backwards());
          break;
        case 'L':
          commands.push(new Left());
          break;
        case 'R':
          commands.push(new Right());
          break;
        default:
      }
    });


    return commands;
  }
}