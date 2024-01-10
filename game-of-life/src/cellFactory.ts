import { CellState } from "./cell";
import { CellInterface, DeadCell, InvalidCell, LivingCell } from "./cellNullObjectPattern";

export class CellFactory {
  static create(cellState: CellState): CellInterface {
    if (cellState !== 'alive' && cellState !== 'dead') {
      return new InvalidCell();
    }

    if (cellState === 'alive') {
      return new LivingCell();
    }

    return new DeadCell();
  }
}