import fs from 'fs';
import generateDifference from '../src';

let expected;
let expectNested;
let expectPlain;
let expectJSON;

const pathFlat = '__tests__/__fixtures__/__flat__/';
const pathNested = '__tests__/__fixtures__/__nested__/';

beforeAll(() => {
  expected = fs.readFileSync(`${pathFlat}expected`, 'UTF-8').trim();
  expectNested = fs.readFileSync(`${pathNested}expected`, 'UTF-8').trim();
  expectPlain = fs.readFileSync('__tests__/__fixtures__/__plain__/expected', 'UTF-8');
  expectJSON = fs.readFileSync('__tests__/__fixtures__/__json__/expected', 'UTF-8');
});

test.each(['json', 'yml', 'ini'])('generateDiff %s', (format) => {
  expect(
    generateDifference(
      `${pathFlat}before.${format}`,
      `${pathFlat}after.${format}`,
    ),
  ).toBe(expected);
});

test.each(['json', 'yml', 'ini'])('generateDiff for nested files %s', (format) => {
  expect(
    generateDifference(
      `${pathNested}before.${format}`,
      `${pathNested}after.${format}`,
    ),
  ).toBe(expectNested);
});

test.each(['json', 'yml', 'ini'])('generate plane Diff %s', (format) => {
  expect(
    generateDifference(
      `${pathNested}before.${format}`,
      `${pathNested}after.${format}`,
      'plain',
    ),
  ).toBe(expectPlain);
});

test.each(['json', 'yml', 'ini'])('generate json Diff %s', (format) => {
  expect(
    generateDifference(
      `${pathNested}before.${format}`,
      `${pathNested}after.${format}`,
      'json',
    ),
  ).toBe(expectJSON);
});
