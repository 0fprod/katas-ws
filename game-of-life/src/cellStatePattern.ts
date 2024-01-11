export interface CellInterface {
  tick(numberOfNeighbours: number): CellInterface;
  toString(): string;
}

export class LivingCell implements CellInterface {
  tick(numberOfNeighbours: number): CellInterface {
    if ((numberOfNeighbours < 2 || numberOfNeighbours > 3)) {
      return new DeadCell();
    } else {
      return new LivingCell();
    }
  }

  toString(): string {
    return '1';
  }
}

export class DeadCell implements CellInterface {
  tick(numberOfNeighbours: number): CellInterface {
    if (numberOfNeighbours === 3) {
      return new LivingCell();
    } else {
      return new DeadCell();
    }
  }

  toString(): string {
    return '0';
  }
}

export class InvalidCell implements CellInterface {
  tick(numberOfNeighbours: number): CellInterface {
    throw new Error('Invalid cell state');
  }

  toString(): string {
    return 'e';
  }
}