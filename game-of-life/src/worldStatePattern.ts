import { CellInterface, LivingCell } from './cellStatePattern'

export class WorldStatePattern {
  private cells: CellInterface[][];

  private constructor(cells: CellInterface[][]) {
    this.cells = cells;
  }

  public static Create(cells: CellInterface[][]): WorldStatePattern {
    return new WorldStatePattern(cells);
  }

  tick(): WorldStatePattern {

    const newCells2 = this.cells.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        const aliveNeighboursAt = this.getNumberOfAliveNeighboursAt(rowIndex, columnIndex);
        return cell.tick(aliveNeighboursAt);
      });
    });

    return WorldStatePattern.Create(newCells2);
  }

  public getNumberOfAliveNeighboursAt(row: number, column: number): number {
    const numberOfAliveNeighboursInTheSameRow = this.getNumberOfAliveNeighboursInTheSameRow(row, column);
    const aliveNeighboursInThePreviousRow = this.getNumberOfAliveNeighboursInThePreviousRow(row, column);
    const aliveNeighboursInTheNextRow = this.getNumberOfAliveNeighboursInTheNextRow(row, column);

    return numberOfAliveNeighboursInTheSameRow + aliveNeighboursInThePreviousRow + aliveNeighboursInTheNextRow;
  }

  private getNumberOfAliveNeighboursInTheSameRow(row: number, column: number): number {
    const aliveNeighboursInThePreviousColumn = this.getNumberOfAliveNeighboursInThePreviousColumn(row, column);
    const aliveNeighboursInTheNextColumn = this.getNumberOfAliveNeighboursInTheNextColumn(row, column);

    return aliveNeighboursInThePreviousColumn + aliveNeighboursInTheNextColumn;
  }

  private getNumberOfAliveNeighboursInThePreviousRow(row: number, column: number): number {
    const cellAtLeftDiagonal = this.isCellAliveAt(row - 1, column - 1) ? 1 : 0;
    const cellAtRightDiagonal = this.isCellAliveAt(row - 1, column + 1) ? 1 : 0;
    const cellAbove = this.isCellAliveAt(row - 1, column) ? 1 : 0;
    return cellAtLeftDiagonal + cellAtRightDiagonal + cellAbove;
  }

  private getNumberOfAliveNeighboursInTheNextRow(row: number, column: number): number {
    const cellAtRightDiagonal = this.isCellAliveAt(row + 1, column + 1) ? 1 : 0;
    const cellAtLeftDiagonal = this.isCellAliveAt(row + 1, column - 1) ? 1 : 0;
    const cellBelow = this.isCellAliveAt(row + 1, column) ? 1 : 0;

    return cellAtRightDiagonal + cellAtLeftDiagonal + cellBelow;
  }


  private getNumberOfAliveNeighboursInThePreviousColumn(row: number, column: number): number {
    return this.isCellAliveAt(row, column - 1) ? 1 : 0;
  }

  private getNumberOfAliveNeighboursInTheNextColumn(row: number, column: number): number {
    return this.isCellAliveAt(row, column + 1) ? 1 : 0;
  }

  private isCellAliveAt(row: number, column: number): boolean {
    if (row < 0 || row >= this.cells.length) {
      return false;
    }

    if (column < 0 || column >= this.cells[row].length) {
      return false;
    }

    const cell = this.cells[row][column];

    return cell instanceof LivingCell;
  }

  toString(): string {
    return this.cells.map(row => row.map(cell => cell.toString()).join('')).join('\n');
  }
}