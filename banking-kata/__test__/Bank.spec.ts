import { Account, ConsoleMock, StatementPrinter, Transaction, TransactionRepository } from '../src';
import { TransactionClock } from '../src/TransactionClock';


describe('AcceptanceTests', () => {
  it('Prints all the transactions through the console', () => {
    const consoleMock = new ConsoleMock();
    const consoleSpy = jest.spyOn(consoleMock, 'log');
    const transactionClock = new TransactionClock();
    transactionClock.now = jest.fn()
      .mockReturnValueOnce('10/01/2022')
      .mockReturnValueOnce('13/01/2022')
      .mockReturnValueOnce('14/01/2022');

    const account = new Account(new TransactionRepository(transactionClock), new StatementPrinter(consoleMock));
    account.deposit(1000);
    account.withdraw(500);
    account.deposit(2000);

    account.printStatement();

    expect(consoleSpy).toHaveBeenCalledTimes(4);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Date | Amount | Balance');
    expect(consoleSpy).toHaveBeenNthCalledWith(2, '10/01/2022 | 1000 | 1000');
    expect(consoleSpy).toHaveBeenNthCalledWith(3, '13/01/2022 | -500 | 500');
    expect(consoleSpy).toHaveBeenNthCalledWith(4, '14/01/2022 | 2000 | 2500');
  });
});

describe('An account is able to', () => {
  it('do a deposit', () => {
    const consoleMock = new ConsoleMock();
    const transactionRepository = new TransactionRepository(new TransactionClock());
    const transactionRepositorySpy = jest.spyOn(transactionRepository, 'addDeposit');
    const account = new Account(transactionRepository, new StatementPrinter(consoleMock));
    account.deposit(1000);

    expect(transactionRepositorySpy).toHaveBeenCalledWith(1000);
  });

  it('do a withdraw if there is enough balance', () => {
    const consoleMock = new ConsoleMock();
    const transactionRepository = new TransactionRepository(new TransactionClock());
    const transactionRepositorySpy = jest.spyOn(transactionRepository, 'addWithdraw');
    const account = new Account(transactionRepository, new StatementPrinter(consoleMock));
    account.deposit(1000);
    account.withdraw(500);

    expect(transactionRepositorySpy).toHaveBeenCalledWith(500);
  });

  it('throw error if there is no enough balance to withdraw', () => {
    const consoleMock = new ConsoleMock();
    const transactionRepository = new TransactionRepository(new TransactionClock());
    const account = new Account(transactionRepository, new StatementPrinter(consoleMock));
    transactionRepository.addDeposit(1000);
    expect(() => account.withdraw(1500)).toThrow('There is no enough balance to withdraw');
  });

  it('print statements through the StatementPrinter', () => {
    const consoleMock = new ConsoleMock();
    const statementPrinter = new StatementPrinter(consoleMock);
    const statementPrinterSpy = jest.spyOn(statementPrinter, 'print');
    const transactionRepository = new TransactionRepository(new TransactionClock());
    const mockedTransaction: Transaction = new Transaction(new TransactionClock(), 1000);

    jest.spyOn(transactionRepository, 'allTransactions').mockReturnValue([mockedTransaction]);
    const account = new Account(transactionRepository, statementPrinter);
    account.printStatement();

    expect(statementPrinterSpy).toHaveBeenCalled();
  });
});

describe('StatementPrinter should', () => {
  it('print a statement through the console', () => {
    const consoleMock = new ConsoleMock();
    const consoleSpy = jest.spyOn(consoleMock, 'log');
    const statementPrinter = new StatementPrinter(consoleMock);
    const transactionClock = new TransactionClock();
    transactionClock.now = jest.fn().mockReturnValue('10/01/2022');
    const transactions: Transaction[] = [new Transaction(transactionClock, 1000)];

    statementPrinter.print(transactions);

    expect(consoleSpy).toHaveBeenCalledWith('10/01/2022 | 1000 | 1000');
  });
});

describe('TransactionClock should', () => {
  it('return the current date', () => {
    const transactionClock = new TransactionClock();
    const date = new Date().toLocaleDateString();

    expect(transactionClock.now()).toEqual(date);
  });
});

describe('TransactionRepository should', () => {
  it('return all transactions', () => {
    const transactionRepository = new TransactionRepository(new TransactionClock());
    const mockedTransaction: Transaction = new Transaction(new TransactionClock(), 1000);

    jest.spyOn(transactionRepository, 'allTransactions').mockReturnValue([mockedTransaction]);

    expect(transactionRepository.allTransactions()).toEqual([mockedTransaction]);
  });
});