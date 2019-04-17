import fs from 'fs';
import generateDifference from '../src';

let expected;

beforeAll(() => {
  expected = fs.readFileSync('__tests__/__fixtures__/expected', 'UTF-8').trim();
});

test.each(['json', 'yaml', 'ini'])('generateDiff %s', (format) => {
  expect(
    generateDifference(
      `__tests__/__fixtures__/before.${format}`,
      `__tests__/__fixtures__/after.${format}`,
    ),
  ).toBe(expected);
});
