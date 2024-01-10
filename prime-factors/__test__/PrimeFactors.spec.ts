import { PrimeFactors } from '../src/PrimeFactors';

/*
2 -> [2]
2 * 2 -> [2,2]
2 * 2 * 2 -> [2,2,2]
3 -> [3]
3 * 3 -> [3,3]
3 * 2 -> [2,3]
5 * 5 -> [5,5]
5 * 7 * 11 * 3 -> [3,5,7,11]
*/


describe('String calculator should', () => {
  it('return [] when input is 1', () => {
    expect(PrimeFactors.generate(2)).toEqual([2]);
  });
});