import fs from 'fs';
import generateDifference from '../src';

let expected;

beforeAll(() => {
  expected = fs.readFileSync('__tests__/__fixtures__/expected', 'UTF-8').trim();
});

test('generateDiff json', () => {
  expect(
    generateDifference(
      '__tests__/__fixtures__/before.json',
      '__tests__/__fixtures__/after.json',
    ),
  ).toBe(expected);
});

test('generateDiff yaml', () => {
  expect(
    generateDifference(
      '__tests__/__fixtures__/before.yaml',
      '__tests__/__fixtures__/after.yaml',
    ),
  ).toBe(expected);
});
