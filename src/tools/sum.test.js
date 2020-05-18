/* eslint-disable no-magic-numbers */
import { sumFloats, subtractFloats } from './sum';

test('sumFloats: Floating point addition to 3 decimals should work accurately', () => {
  expect(sumFloats(80.934, 10.734)).toStrictEqual(91.668);
  expect(sumFloats('80.934', '10.734')).toStrictEqual(91.668);
  expect(sumFloats(80, 10.734)).toStrictEqual(90.734);
  expect(sumFloats(0.0, 10.734)).toStrictEqual(10.734);
  expect(sumFloats(0, 0)).toStrictEqual(0);
});

test('subtractFloats: Floating point subtraction to 3 decimals  should work accurately', () => {
  expect(subtractFloats(9.234, 100.333)).toStrictEqual(91.099);
  expect(subtractFloats(8, 10.734)).toStrictEqual(2.734);
  expect(subtractFloats(0.0, 10.734)).toStrictEqual(10.734);
  expect(subtractFloats('0.0', 10.734)).toStrictEqual(10.734);
  expect(subtractFloats(0, 0)).toStrictEqual(0);
});
