import { CellState } from "./cell";


export class Cell {
  private state: CellState;

  public constructor(state: CellState) {
    this.state = state;
  }

  public tick(numberOfNeighbours: number): Cell {
    if (numberOfNeighbours < 2 || numberOfNeighbours > 3) {
      return new Cell('dead');
    }

    return new Cell('alive');
  }

  public isAlive(): boolean {
    return this.state === 'alive';
  }

  public toString(): string {
    return this.state === 'alive' ? '1' : '0';
  }
}

export class InvalidCell extends Cell {

  public constructor() {
    super('invalid' as any);
  }

  public tick(numberOfNeighbours: number): Cell {
    return this;
  }

  public isAlive(): boolean {
    return false;
  }

  public toString(): string {
    return 'e';
  }
}

export class CellFactory {
  static create(cellState: CellState): Cell {
    if (this.isInvalidState(cellState)) {
      return new InvalidCell()
    }

    return new Cell(cellState);
  }

  private static isInvalidState(cellState: CellState): boolean {
    return cellState !== 'alive' && cellState !== 'dead';
  }
}