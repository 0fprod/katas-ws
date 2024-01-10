import { Transaction } from "./Transaction";
import { TransactionClock } from "./TransactionClock";

export class TransactionRepository {
  private transactions: Transaction[] = [];

  constructor(private transactionClock: TransactionClock) { }

  addDeposit(amount: number): void {
    this.transactions.push(new Transaction(this.transactionClock, amount));
  }

  addWithdraw(amount: number): void {
    this.transactions.push(new Transaction(this.transactionClock, -amount));
  }

  allTransactions(): Transaction[] {
    return this.transactions;
  }

  lastTransaction(): Transaction {
    if (this.transactions.length > 0) {
      return this.transactions[this.transactions.length - 1];
    }

    return null;
  }
}