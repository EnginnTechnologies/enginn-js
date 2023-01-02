import Utils from '../src/Utils';

const CAMELIZE_CASES = [
  [null, null],
  [undefined, undefined],
  ['', ''],
  [' ', ' '],
  ['a', 'a'],
  ['foo_bar ok', 'fooBar ok'],
  ['Maj_Update', 'MajUpdate']
];

describe('Utils', () => {
  CAMELIZE_CASES.forEach(([input, output]) => {
    test(`${input}`, () => {
      return expect(Utils.camelize(input)).toEqual(output);
    });
  })
});
