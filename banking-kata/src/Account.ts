import { StatementPrinter } from "./StatementPrinter";
import { TransactionRepository } from "./TransactionRepository";


export class Account {

  constructor(
    private transactionRepository: TransactionRepository,
    private statementPrinter: StatementPrinter
  ) {
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    this.transactionRepository.addDeposit(amount);
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    if (this.calculateBalanceFromTransactions() < amount) {
      throw new Error('There is no enough balance to withdraw');
    }
    this.transactionRepository.addWithdraw(amount);
  }

  printStatement(): void {
    const transactions = this.transactionRepository.allTransactions();
    this.statementPrinter.print(transactions);
  }

  private calculateBalanceFromTransactions(): number {
    const transactions = this.transactionRepository.allTransactions();
    return transactions.reduce((balance, transaction) => balance + transaction.amount, 0);
  }
}