import { Direction } from "../interfaces";
import { Coordinates } from "./Coordinates";

export class Position {

  constructor(public coordinates: Coordinates, public direction: Direction) {
    this.coordinates = coordinates;
    this.direction = direction;
  }

  moveForward(): void {
    this.coordinates = this.coordinates.getNextForwardCoordinatesFor(this.direction);
  };

  moveBackwards(): void {
    this.coordinates = this.coordinates.getNextBackwardCoordinatesFor(this.direction);
  };

  turnLeft(): void {
    this.direction = this.direction.turnLeft();
  }

  turnRight(): void {
    this.direction = this.direction.turnRight();
  }

  getCoordinates(): Coordinates {
    return this.coordinates;
  }

  getDirection(): Direction {
    return this.direction;
  }
}