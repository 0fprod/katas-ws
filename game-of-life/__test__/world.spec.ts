import { Cell } from "../src/cell";
import { World } from "../src/world";

describe('A world', () => {

  it('is created with the given cells array', () => {
    // Arrange
    const cells = [
      [Cell.Create('alive'), Cell.Create('dead')],
      [Cell.Create('dead'), Cell.Create('alive')]
    ];

    // Act
    const world = World.Create(cells);

    // Assert
    expect(world).toBeInstanceOf(World);
    expect(world.toString()).toBe('10\n01');
  });

  it('when ticks, also the cells ticks', () => {
    // Arrange
    const aCell = Cell.Create('alive');
    const anotherCell = Cell.Create('dead');
    const aCellSpy = jest.spyOn(aCell, 'tick');
    const anotherCellSpy = jest.spyOn(anotherCell, 'tick');
    const cells = [
      [aCell, anotherCell],
    ];
    const world = World.Create(cells);

    // Act
    world.tick();

    // Assert
    expect(aCellSpy).toHaveBeenCalled();
    expect(anotherCellSpy).toHaveBeenCalled();
  });

  it('when ticks it generates a new world with the new cells', () => {
    // Arrange
    const firstWorldCells = [
      [Cell.Create('dead'), Cell.Create('alive')],
      [Cell.Create('alive'), Cell.Create('alive')]
    ];
    const nextWorldCells = [
      [Cell.Create('alive'), Cell.Create('alive')],
      [Cell.Create('alive'), Cell.Create('alive')]
    ];
    const firstWorld = World.Create(firstWorldCells);
    const nextWorld = World.Create(nextWorldCells);

    // Act
    const newWorld = firstWorld.tick();

    // Assert
    expect(newWorld.toString()).toBe(nextWorld.toString());
  });

  it('calculates the number of alive neighbours for a given cell', () => {
    // Arrange
    const cells = [
      [Cell.Create('dead'), Cell.Create('alive'), Cell.Create('dead'), Cell.Create('alive')],
      [Cell.Create('dead'), Cell.Create('dead'), Cell.Create('dead'), Cell.Create('alive')],
      [Cell.Create('alive'), Cell.Create('alive'), Cell.Create('alive'), Cell.Create('alive')],
      [Cell.Create('alive'), Cell.Create('alive'), Cell.Create('alive'), Cell.Create('alive')],
      [Cell.Create('alive'), Cell.Create('alive'), Cell.Create('alive'), Cell.Create('alive')]
    ];
    const world = World.Create(cells);

    // Assert
    expect(world.getNumberOfAliveNeighboursAt(0, 0)).toBe(1);
    expect(world.getNumberOfAliveNeighboursAt(0, 1)).toBe(0);
    expect(world.getNumberOfAliveNeighboursAt(0, 2)).toBe(3);
    expect(world.getNumberOfAliveNeighboursAt(3, 1)).toBe(8);
  });
});