import { CellInterface, DeadCell, LivingCell } from "../src/cellNullObjectPattern";
import { WorldNullObjectPattern } from "../src/worldNullObjectPattern";

describe('A world', () => {

  it('is created with the given cells array', () => {
    // Arrange
    const cells = [
      [new LivingCell(), new DeadCell()],
      [new DeadCell(), new LivingCell()]
    ];

    // Act
    const world = WorldNullObjectPattern.Create(cells);

    // Assert
    expect(world).toBeInstanceOf(WorldNullObjectPattern);
    expect(world.toString()).toBe('10\n01');
  });

  it('when ticks, also the cells ticks', () => {
    // Arrange
    const aCell = new LivingCell();
    const anotherCell = new DeadCell();
    const aCellSpy = jest.spyOn(aCell, 'tick');
    const anotherCellSpy = jest.spyOn(anotherCell, 'tick');
    const cells = [
      [aCell, anotherCell],
    ];
    const world = WorldNullObjectPattern.Create(cells);

    // Act
    world.tick();

    // Assert
    expect(aCellSpy).toHaveBeenCalled();
    expect(anotherCellSpy).toHaveBeenCalled();
  });

  it('when ticks it generates a new world with the new cells', () => {
    // Arrange
    const firstWorldCells = [
      [new DeadCell(), new LivingCell()],
      [new LivingCell(), new LivingCell()]
    ];
    const nextWorldCells = [
      [new LivingCell(), new LivingCell()],
      [new LivingCell(), new LivingCell()]
    ];
    const firstWorld = WorldNullObjectPattern.Create(firstWorldCells);
    const nextWorld = WorldNullObjectPattern.Create(nextWorldCells);

    // Act
    const newWorld = firstWorld.tick();

    // Assert
    expect(newWorld.toString()).toBe(nextWorld.toString());
  });

  it('calculates the number of alive neighbours for a given cell', () => {
    // Arrange
    const cells = [
      [new DeadCell(), new LivingCell(), new DeadCell(), new LivingCell()],
      [new DeadCell(), new DeadCell(), new DeadCell(), new LivingCell()],
      [new LivingCell(), new LivingCell(), new LivingCell(), new LivingCell()],
      [new LivingCell(), new LivingCell(), new LivingCell(), new LivingCell()],
      [new LivingCell(), new LivingCell(), new LivingCell(), new LivingCell()]
    ];
    const world = WorldNullObjectPattern.Create(cells);

    // Assert
    expect(world.getNumberOfAliveNeighboursAt(0, 0)).toBe(1);
    expect(world.getNumberOfAliveNeighboursAt(0, 1)).toBe(0);
    expect(world.getNumberOfAliveNeighboursAt(0, 2)).toBe(3);
    expect(world.getNumberOfAliveNeighboursAt(3, 1)).toBe(8);
  });
});