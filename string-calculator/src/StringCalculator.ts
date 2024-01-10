export class StringCalculator {

  private readonly DEFAULT_SEPARATOR: string = ',';
  private readonly NOTHING_TO_ADD: number = 0;

  public add(text: string): number {
    const isInvalidText = text === null || text === undefined || text === '';
    if (isInvalidText)
      return this.NOTHING_TO_ADD;

    const separator: string = this.getCustomSeparatorFrom(text);
    const textWithoutSeparator: string = this.removeCustomSeparatorFromText(text, separator);
    const splittedText: string[] = textWithoutSeparator.split(separator);
    const numbers: number[] = splittedText.map((character: string) => this.parseNumber(character));
    const sumOfNumbers = numbers.reduce((total: number, number: number) => total + number, 0);

    return sumOfNumbers;
  }

  private removeCustomSeparatorFromText(text: string, separator: string): string {
    if (separator === this.DEFAULT_SEPARATOR) {
      return text;
    }

    const indexOfSeparator: number = text.indexOf(separator);
    const restOfText: string = text.substring(indexOfSeparator + 2);
    return restOfText;
  }

  private parseNumber(number: string): number {
    return isNaN(Number(number)) ? this.NOTHING_TO_ADD : Number(number);
  }

  private getCustomSeparatorFrom(text: string): string {
    const separatorRegexp: RegExp = /^\/\/(.+)\/.*$/
    const separatorMatch: RegExpMatchArray | null = text.match(separatorRegexp);
    return separatorMatch ? separatorMatch[1] : this.DEFAULT_SEPARATOR;
  }
}