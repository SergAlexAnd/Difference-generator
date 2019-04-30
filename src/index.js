import _ from 'lodash/fp';
import path from 'path';
import fs from 'fs';
import getParser from './parsers';
import render from './formatters';

const generateKeys = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const allKeys = _.union(beforeKeys, afterKeys);
  const astTree = allKeys.map((key) => {
    const isBeforeHasKey = _.has(key, before);
    const isAfterHasKey = _.has(key, after);
    const isBeforeHasChildren = typeof before[key] === 'object';
    const isAfterHasChildren = typeof after[key] === 'object';
    if (isBeforeHasKey && !isAfterHasKey) return { type: 'minus', key, value: before[key] };
    if (!isBeforeHasKey && isAfterHasKey) return { type: 'plus', key, value: after[key] };
    if (before[key] === after[key]) return { key, type: 'notChanged', value: after[key] };
    if (isAfterHasChildren && isBeforeHasChildren) {
      return { key, type: 'hasChildren', children: generateKeys(before[key], after[key]) };
    }
    return ({
      type: 'changed', key, afterValue: after[key], value: before[key],
    });
  });
  return _.sortBy('key')(astTree);
};

const generateDifference = (firstConfigData, secondConfigData, format = 'recursion') => {
  const parse = getParser(path.extname(firstConfigData));
  const beforeContent = parse(fs.readFileSync(firstConfigData, 'UTF-8'));
  const afterContent = parse(fs.readFileSync(secondConfigData, 'UTF-8'));
  const renderFormat = render(format);
  const generatedKeys = generateKeys(beforeContent, afterContent);
  return renderFormat(generatedKeys);
};

export default generateDifference;
