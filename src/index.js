import _ from 'lodash';
import parse from './parsers';
import render from './formatters';

const generateKeys = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const addedKeys = _.difference(afterKeys, beforeKeys).map(key => ({
    type: 'plus',
    key,
    value: after[key],
  }));
  const removedKeys = _.difference(beforeKeys, afterKeys).map(key => ({
    type: 'minus',
    key,
    value: before[key],
  }));
  const commonKeys = _.intersection(beforeKeys, afterKeys).map((key) => {
    if (before[key] === after[key]) {
      return {
        key, type: 'notChanged', value: after[key],
      };
    }
    const isBeforeHasChildren = typeof before[key] === 'object';
    const isAfterHasChildren = typeof after[key] === 'object';
    if (isAfterHasChildren && isBeforeHasChildren) {
      return {
        key,
        type: 'hasChildren',
        children: generateKeys(before[key], after[key]),
      };
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

const generateDifference = (firstConfig, secondConfig, format = 'recursion') => {
  const before = parse(firstConfig);
  const after = parse(secondConfig);
  const renderFormat = render(format);
  const generatedKeys = generateKeys(before, after);

  return renderFormat(generatedKeys);
};

export default generateDifference;
