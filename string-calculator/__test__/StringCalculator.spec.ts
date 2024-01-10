import { StringCalculator } from '../src/StringCalculator';

describe('String calculator should', () => {
  const stringCalculator: StringCalculator = new StringCalculator();

  it('return 0 when given an empty string', () => {
    expect(stringCalculator.add('')).toBe(0);
    expect(stringCalculator.add(null as any)).toBe(0);
    expect(stringCalculator.add(undefined as any)).toBe(0);
  })

  it('convert a string number to a number', () => {
    expect(stringCalculator.add('1')).toBe(1);

  })

  it('sum two numbers separated by comma', () => {
    expect(stringCalculator.add('1,2')).toBe(3);
    expect(stringCalculator.add('1,2,3')).toBe(6);
  })

  it('not sum non numeric values', () => {
    expect(stringCalculator.add('a')).toBe(0);
    expect(stringCalculator.add('1,a')).toBe(1);
    expect(stringCalculator.add('1,a,2')).toBe(3);
    expect(stringCalculator.add('1a,2')).toBe(2);
  });

  it('sum numbers separated by a custom separator', () => {
    expect(stringCalculator.add('//#/3#2')).toBe(5);
    expect(stringCalculator.add('//#/3,2')).toBe(0);
    expect(stringCalculator.add('//%/1%2%3')).toBe(6);

  })

  //   En el caso de recibir null o una cadena vacía no se incrementa el total. Ej.: null ⇒ 0, "" ⇒ 0
  // Convierte un número en formato string a un tipo numérico. Ej.: "1" ⇒ 1
  // Suma todos los números separados por comas. Ej.: "1,2" ⇒ 3, "1,2,3" ⇒ 6
  // No incrementa el total para valores no numéricos. Ej.: "a" ⇒ 0, "1,a" ⇒ 1, "1,a,2" ⇒ 3, "1a, 2" ⇒ 2
  // Suma todos los números separados por un separador personalizado. Ej.: "//#/3#2" ⇒ 5, "//#/3,2" ⇒ 0, "//%/1%2%3" ⇒ 6
});