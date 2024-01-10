export class TransactionClock {
  now(): string {
    return new Date().toLocaleDateString();
  }
}