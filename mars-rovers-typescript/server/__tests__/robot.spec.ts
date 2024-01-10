import { Coordinates } from "../src/models/Coordinates";
import { Robot } from "../src/models/Robot";
import { Backwards, East, Forward, Left, North, Right, South, West } from "../src/models";


describe('Mars robot should', () => {
  it('execute Forward command', () => {
    const robot = new Robot(new Coordinates(0, 0));

    robot.executeCommand(new Forward());

    const { coordinates, direction } = robot.getPosition();
    expect(coordinates).toEqual({ x: 1, y: 0 });
    expect(direction).toBeInstanceOf(East);
  });

  it('execute Backward command', () => {
    const robot = new Robot(new Coordinates(0, 0));

    robot.executeCommand(new Backwards());

    const { coordinates, direction } = robot.getPosition();
    expect(coordinates).toEqual({ x: -1, y: 0 });
    expect(direction).toBeInstanceOf(East);
  });

  it('execut Left command', () => {
    const robot = new Robot(new Coordinates(0, 0), new East());

    robot.executeCommand(new Left());

    const { coordinates, direction } = robot.getPosition();
    expect(coordinates).toEqual({ x: 0, y: 0 });
    expect(direction).toBeInstanceOf(North);
  });

  it('execute Right command', () => {
    const robot = new Robot(new Coordinates(0, 0), new South());

    robot.executeCommand(new Right());

    const { coordinates, direction } = robot.getPosition();
    expect(coordinates).toEqual({ x: 0, y: 0 });
    expect(direction).toBeInstanceOf(West);
  });

  it('execute multiple commands', () => {
    const robot = new Robot(new Coordinates(0, 0), new South());

    robot.executeCommand(new Right());
    robot.executeCommand(new Forward());
    robot.executeCommand(new Forward());
    robot.executeCommand(new Left());
    robot.executeCommand(new Backwards());

    const { coordinates, direction } = robot.getPosition();
    expect(coordinates).toEqual({ x: -2, y: 1 });
    expect(direction).toBeInstanceOf(South);
  });
});
