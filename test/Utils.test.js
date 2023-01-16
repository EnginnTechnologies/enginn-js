import Utils from '../src/Utils';

describe('Utils', () => {
  describe('.camelize', () => {
    [
      [null, null],
      [undefined, undefined],
      ['', ''],
      [' ', ' '],
      ['a', 'a'],
      ['foo_bar ok', 'fooBar ok'],
      ['Maj_Update', 'MajUpdate']
    ].forEach(([input, output]) => {
      test(`${input}`, () => {
        return expect(Utils.camelize(input)).toEqual(output);
      });
    });
  });

  describe('.buildQueryParams', () => {
    [
      [undefined, ''],
      [null, ''],
      [{}, ''],
      [{ a: 42 }, 'a=42'],
      [{ b: [1, 2] }, 'b[]=1&b[]=2'],
      [{ c: { d: 5 } }, 'c[d]=5'],
      [{ c: { d: [5, 6], e: { f: 7 } } }, 'c[d][]=5&c[d][]=6&c[e][f]=7'],
      [{ c: { d: { e: { f: [8, 9] } } } }, 'c[d][e][f][]=8&c[d][e][f][]=9']
    ].forEach(([input, output]) => {
      test(`${input}`, () => {
        return expect(Utils.buildQueryParams(input)).toEqual(output);
      });
    });
  });
});
