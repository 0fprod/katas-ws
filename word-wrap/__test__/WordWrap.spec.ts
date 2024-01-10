import { wordWrap } from '../src/WordWrap';
import { Text } from '../src/Text';
import { Width } from '../src/Width';

describe('Text', () => { 
  it('should return empty string when input is null or undefined', () => {
    expect(Text.from(null as any)).toEqual(Text.empty());
    expect(Text.from(undefined as any)).toEqual(Text.empty());
  })
});

describe('Width', () => { 
  it('should throw exception when width is negative', () => {
    expect(() => Width.from(-1)).toThrow('width cannot be negative');
  });
});

describe('WordWrap', () => {
  it('should return the same text when its shorter or equal to width', () => {
    expect(wordWrap(Text.empty(), Width.from(5))).toEqual(Text.from(''));
    expect(wordWrap(Text.from('hi'), Width.from(5))).toEqual(Text.from('hi'));
    expect(wordWrap(Text.from('hello'), Width.from(5))).toEqual(Text.from('hello'));
  });

  it('should split the string when input is longer than width', () => {
    expect(wordWrap(Text.from('longword'), Width.from(4))).toEqual(Text.from('long\nword'));
    expect(wordWrap(Text.from('reallylongword'),Width.from(4))).toEqual(Text.from('real\nlylo\nngwo\nrd'));
  });

  it('should split at space if its before the width', () => {
    expect(wordWrap(Text.from('abc def'), Width.from(4))).toEqual(Text.from('abc\ndef'));
    expect(wordWrap(Text.from('abc def ghi'), Width.from(4))).toEqual(Text.from('abc\ndef\nghi'));
    expect(wordWrap(Text.from(' abcdf'), Width.from(4))).toEqual(Text.from('\nabcd\nf'));
  });

});