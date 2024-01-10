import { TransactionClock } from "./TransactionClock";

export class Transaction {
  private _amount: number;
  private _date: string;

  constructor(clock: TransactionClock, amount: number) {
    this._date = clock.now();
    this._amount = amount;
  }

  get amount(): number {
    return this._amount;
  }

  get date(): string {
    return this._date;
  }
}