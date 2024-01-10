import { Robot } from "./models/Robot";
import { CommandFactory } from "./CommandFactory";

export class MarsRoversController {

  private robot: Robot;

  constructor() {
    this.robot = new Robot();
  }

  sendCommands(textCommands: string = '') {
    const commands = CommandFactory.createCommands(textCommands);

    commands.forEach((command) => {
      this.robot.executeCommand(command);
    });
  }

  getRoverPosition() {
    return this.robot.getPosition();
  }
}

