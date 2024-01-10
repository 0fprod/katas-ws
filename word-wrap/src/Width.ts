


export class Width {
  constructor(private readonly value: number) { }

  static from(value: number): Width {
    if (value < 0) {
      throw new Error('width cannot be negative');
    }
    return new Width(value);
  }

  getValue(): number {
    return this.value;
  }
}
