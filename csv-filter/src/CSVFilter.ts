export class CSVFilter {

  private constructor(private readonly lines: string[]) { }
  
  static create(lines: string[]) {
    const [header, ...restOfLines] = lines;
    
    const fileteredLines = restOfLines.filter(line => {
  const RegexToMatchNumbersWithDecimals = /^\d+(\.\d+)?$/;

      const [_, __, ___, ____, iva, igic] = line.split(',');
      const bothTaxesAreFulfilled = iva !== '' && igic !== '';
      const bothTaxesAreNotFulfilled = iva === '' && igic === '';
      const ivaContainsNonDecimalCharacters = iva.match(RegexToMatchNumbersWithDecimals);
      const igicContainsNonDecimalCharacters = igic.match(RegexToMatchNumbersWithDecimals);

      return !bothTaxesAreFulfilled && !bothTaxesAreNotFulfilled && !ivaContainsNonDecimalCharacters && !igicContainsNonDecimalCharacters;
    });

    return new CSVFilter([header, ...fileteredLines]);
  }

  get filteredLines(): string[] {
    return this.lines;
  }

} 

// Regex to match numbers with decimals: /^\d+(\.\d+)?$/