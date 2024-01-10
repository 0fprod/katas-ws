import { Coordinates } from "./Coordinates";
import { Direction, Command } from "../interfaces";
import { Position } from "./Position";
import { Forward, Backwards, Left, Right } from "./commands";
import { East } from "./directions";


export class Robot {
  private position: Position;

  constructor(initialCoordinates = new Coordinates(0, 0), initialDirection = new East()) {
    this.position = new Position(initialCoordinates, initialDirection);
  }

  executeCommand(command: Command) {
    if (command instanceof Forward) {
      this.position.moveForward();
      return;
    }

    if (command instanceof Backwards) {
      this.position.moveBackwards();
      return;
    }

    if (command instanceof Left) {
      this.position.turnLeft();
      return;
    }

    if (command instanceof Right) {
      this.position.turnRight();
      return;
    }
  }

  getPosition(): Position {
    return this.position;
  }

  getCoordinates(): Coordinates {
    return this.position.getCoordinates();
  }

  getDirection(): Direction {
    return this.position.getDirection();
  }
}