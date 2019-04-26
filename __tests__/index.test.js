import fs from 'fs';
import generateDifference from '../src';

let expected;
let expectNested;
let expectPlain;

beforeAll(() => {
  expected = fs.readFileSync('__tests__/__fixtures__/__flat__/expected', 'UTF-8').trim();
  expectNested = fs.readFileSync('__tests__/__fixtures__/__nested__/expected', 'UTF-8').trim();
  expectPlain = fs.readFileSync('__tests__/__fixtures__/__plain__/expected', 'UTF-8');
});

test.each(['json', 'yml', 'ini'])('generateDiff %s', (format) => {
  expect(
    generateDifference(
      `__tests__/__fixtures__/__flat__/before.${format}`,
      `__tests__/__fixtures__/__flat__/after.${format}`,
    ),
  ).toBe(expected);
});

test.each(['json', 'yml', 'ini'])('generateDiff for nested files %s', (format) => {
  expect(
    generateDifference(
      `__tests__/__fixtures__/__nested__/before.${format}`,
      `__tests__/__fixtures__/__nested__/after.${format}`,
    ),
  ).toBe(expectNested);
});

test.each(['json', 'yml', 'ini'])('generate plane Diff %s', (format) => {
  expect(
    generateDifference(
      `__tests__/__fixtures__/__nested__/before.${format}`,
      `__tests__/__fixtures__/__nested__/after.${format}`,
      'plain',
    ),
  ).toBe(expectPlain);
});
