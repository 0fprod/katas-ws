export type CellState = 'alive' | 'dead';

export class Cell {
  private status: CellState;

  private constructor(cellState: CellState) {
    this.status = cellState;
  }

  public static Create(cellState: CellState): Cell {
    if (cellState !== 'alive' && cellState !== 'dead') {
      throw new Error(`Invalid cell state: ${cellState}`);
    }

    return new Cell(cellState);
  }

  isAlive(): boolean {
    return this.status === 'alive';
  }


  tick(numberOfNeighbours: number): Cell {
    if (!this.isAlive()) {
      return this.changeDeadCellStatusBasedOnNumberOfNeighbours(numberOfNeighbours);
    }

    return this.changeLivingCellStatusBasedOnNumberOfNeighbours(numberOfNeighbours);
  }

  public toString(): string {
    if (this.isAlive()) {
      return '1';
    } else {
      return '0';
    }
  }

  private changeDeadCellStatusBasedOnNumberOfNeighbours(numberOfNeighbours: number): Cell {
    if (numberOfNeighbours === 3) {
      return new Cell('alive');
    } else {
      return new Cell('dead');
    }
  }


  private changeLivingCellStatusBasedOnNumberOfNeighbours(numberOfNeighbours: number): Cell {
    if ((numberOfNeighbours < 2 || numberOfNeighbours > 3)) {
      return new Cell('dead');
    } else {
      return new Cell('alive');
    }
  }

}