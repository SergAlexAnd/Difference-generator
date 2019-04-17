import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const generateKeys = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const addedKeys = _.difference(afterKeys, beforeKeys)
    .map(key => ({ type: 'plus', key, value: after[key] }));
  const removedKeys = _.difference(beforeKeys, afterKeys)
    .map(key => ({ type: 'minus', key, value: before[key] }));
  const commonKeys = _.intersection(beforeKeys, afterKeys)
    .map((key) => {
      if (before[key] === after[key]) {
        return { key, type: 'notChanged', value: after[key] };
      }
      return {
        type: 'changed',
        key,
        afterValue: after[key],
        value: before[key],
      };
    });
  return [...commonKeys, ...removedKeys, ...addedKeys];
};

const render = (keys) => {
  const strings = keys.map(({
    type, key, value, afterValue,
  }) => {
    if (type === 'plus') {
      return ` + ${key}: ${value}\n`;
    }
    if (type === 'minus') {
      return ` - ${key}: ${value}\n`;
    }
    if (type === 'notChanged') {
      return `   ${key}: ${value}\n`;
    }
    if (type === 'changed') {
      return ` + ${key}: ${afterValue}\n - ${key}: ${value}\n`;
    }
    return null;
  });
  return `{\n${strings.join('')}}`;
};

const generateDifference = (firstConfig, secondConfig) => {
  const before = JSON.parse(fs.readFileSync(path.resolve(firstConfig), 'UTF-8'));
  const after = JSON.parse(fs.readFileSync(path.resolve(secondConfig), 'UTF-8'));

  const generatedKeys = generateKeys(before, after);

  return render(generatedKeys);
};

export default generateDifference;
