import { ConsoleMock } from "./ConsoleMock";
import { Transaction } from "./Transaction";

export class StatementPrinter {

  constructor(private console: ConsoleMock) {
  }

  private printHeader() {
    this.console.log('Date | Amount | Balance');
  }

  print(transaction: Transaction[]): void {
    this.printHeader();
    let balance = 0;
    transaction.forEach((transaction) => {
      balance += transaction.amount;
      this.console.log(`${transaction.date} | ${transaction.amount} | ${balance}`);
    });
  }
}
