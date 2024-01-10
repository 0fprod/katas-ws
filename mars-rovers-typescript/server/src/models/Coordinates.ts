import { Direction } from "../interfaces";
import { East, North, South, West } from "./directions";


export class Coordinates {

  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  getNextForwardCoordinatesFor(direction: Direction): Coordinates {
    if (direction instanceof East) {
      return new Coordinates(this.x + 1, this.y);
    }

    if (direction instanceof West) {
      return new Coordinates(this.x - 1, this.y);
    }

    if (direction instanceof North) {
      return new Coordinates(this.x, this.y + 1);
    }

    if (direction instanceof South) {
      return new Coordinates(this.x, this.y - 1);
    }

    return new Coordinates(this.x, this.y);
  }

  getNextBackwardCoordinatesFor(direction: Direction): Coordinates {
    if (direction instanceof East) {
      return new Coordinates(this.x - 1, this.y);
    }

    if (direction instanceof West) {
      return new Coordinates(this.x + 1, this.y);
    }

    if (direction instanceof North) {
      return new Coordinates(this.x, this.y - 1);
    }

    if (direction instanceof South) {
      return new Coordinates(this.x, this.y + 1);
    }

    return new Coordinates(this.x, this.y);
  }
}