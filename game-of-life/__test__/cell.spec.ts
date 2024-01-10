import { Cell } from '../src/cell';

describe('Any living cell', () => {
  it('should die if it has less than 2 live neighbour', () => {
    const lessThan2Neighbours = Math.floor(Math.random() * 2);
    const cell = Cell.Create('alive');
    const newCell = cell.tick(lessThan2Neighbours);

    expect(newCell.isAlive()).toBeFalsy();
  });

  it('should die if it has more than 3 live neighbours', () => {
    const moreThan3Neighbours = Math.floor(Math.random() * 100) + 4;
    const cell = Cell.Create('alive');
    const newCell = cell.tick(moreThan3Neighbours);

    expect(newCell.isAlive()).toBeFalsy();
  });

  it('should live if it has 2 or 3 live neighbours', () => {
    const twoOrThreeNeighbours = Math.floor(Math.random() * 2) + 2;
    const cell = Cell.Create('alive');
    const newCell = cell.tick(twoOrThreeNeighbours);

    expect(newCell.isAlive()).toBeTruthy();
  });

  it('is represented by a 1', () => {
    const cell = Cell.Create('alive');
    expect(cell.toString()).toBe('1');
  });
});

describe('Any dead cell', () => {
  it('should become a living cell if it has exactly 3 live neighbours', () => {
    const cell = Cell.Create('dead');
    const threeNeighbours = 3;
    const newCell = cell.tick(threeNeighbours);

    expect(newCell.isAlive()).toBeTruthy();
  })

  it('is represented by a 0', () => {
    const cell = Cell.Create('dead');
    expect(cell.toString()).toBe('0');
  });
});

describe('Any cell', () => {
  it('with an invalid state should throw an error', () => {
    const invalidState = 'invalid';
    expect(() => Cell.Create(invalidState as any)).toThrow(`Invalid cell state: ${invalidState}`);
  });
});