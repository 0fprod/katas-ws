import { Width } from "./Width";

export class Text {

  constructor(private readonly value: string) { }

  static empty(): Text {
    return new Text('');
  }

  static from(value: string): Text {
    if (value === null || value === undefined) return Text.empty();

    return new Text(value);
  }

  isEmpty(): boolean {
    return this.value === '';
  }

  isNull(): boolean {
    return this.value === null;
  }

  shorterOrEqualThan(number: Width): boolean {
    return this.value.length <= number.getValue();
  }

  wrapFirstWordUntil(width: Width): Text {
    return Text.from(this.value.substring(0, width.getValue()));
  }

  wrapRemainingWordsFrom(width: Width): Text {
    return Text.from(this.value.substring(width.getValue()));

  }

  indexOf(value: string): number {
    return this.value.indexOf(value);
  }

  contains(searchString: string): boolean {
    return this.value.indexOf(searchString) != -1;
  }

  containsSpacesBefore(width: Width): boolean {
    const indexOfFirstSpace = this.value.indexOf(' ');
    return indexOfFirstSpace != -1 && indexOfFirstSpace <= width.getValue();
  }

  concat(text: string | Text): Text {
    if (typeof text === 'string') {
      return Text.from(this.value.concat(text));
    }

    return Text.from(this.value.concat(text.value));
  }

  split(separator: string): Text[] {
    return this.value.split(separator).map(Text.from);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Text): boolean {
    return this.value === other.value;
  }

}
