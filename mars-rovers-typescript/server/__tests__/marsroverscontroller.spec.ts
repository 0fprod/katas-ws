import { Coordinates } from "../src/models/Coordinates";
import { Position } from "../src/models/Position";
import { MarsRoversController } from "../src/Controller";
import { East, North } from "../src/models";

describe('Mars robot controller should', () => {
  it('send robot to the starting point', () => {
    const startingPosition: Position = new Position(new Coordinates(0, 0), new East());
    const controller = new MarsRoversController();

    controller.sendCommands();

    expect(controller.getRoverPosition()).toEqual(startingPosition);
  });

  it('send robot to X:2, Y:5 facing North', () => {
    const expectedPosition: Position = new Position(new Coordinates(2, 5), new North());
    const controller = new MarsRoversController();

    controller.sendCommands("FFLFFFFFBF");

    expect(controller.getRoverPosition()).toEqual(expectedPosition);
  });

  it('send robot to spin anti-clockwise', () => {
    const expectedPosition: Position = new Position(new Coordinates(0, 0), new East());
    const controller = new MarsRoversController();

    controller.sendCommands("LFLFLFLF");

    expect(controller.getRoverPosition()).toEqual(expectedPosition);
  });

  it('send robot to spin clockwise', () => {
    const expectedPosition: Position = new Position(new Coordinates(0, 0), new East());
    const controller = new MarsRoversController();

    controller.sendCommands("RFRFRFRF");

    expect(controller.getRoverPosition()).toEqual(expectedPosition);
  });
});
