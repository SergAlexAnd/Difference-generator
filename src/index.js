import _ from 'lodash/fp';
import path from 'path';
import fs from 'fs';
import getParser from './parsers';
import render from './formatters';

const generateAst = (beforeData, afterData) => {
  const beforeKeys = Object.keys(beforeData);
  const afterKeys = Object.keys(afterData);
  const allKeys = _.union(beforeKeys, afterKeys);
  const ast = allKeys.map((key) => {
    const isBeforeHasKey = _.has(key, beforeData);
    const isAfterHasKey = _.has(key, afterData);
    const isBeforeHasChildren = typeof beforeData[key] === 'object';
    const isAfterHasChildren = typeof afterData[key] === 'object';
    if (isBeforeHasKey && !isAfterHasKey) return { type: 'minus', key, value: beforeData[key] };
    if (!isBeforeHasKey && isAfterHasKey) return { type: 'plus', key, value: afterData[key] };
    if (beforeData[key] === afterData[key]) return { key, type: 'notChanged', value: afterData[key] };
    if (isAfterHasChildren && isBeforeHasChildren) {
      return { key, type: 'hasChildren', children: generateAst(beforeData[key], afterData[key]) };
    }
    return ({
      type: 'changed', key, afterValue: afterData[key], value: beforeData[key],
    });
  });
  return _.sortBy('key')(ast);
};

const generateDifference = (firstConfigPath, secondConfigPath, format = 'recursion') => {
  const parse = getParser(path.extname(firstConfigPath));
  const beforeData = parse(fs.readFileSync(firstConfigPath, 'UTF-8'));
  const afterData = parse(fs.readFileSync(secondConfigPath, 'UTF-8'));
  const renderFormat = render(format);
  const ast = generateAst(beforeData, afterData);
  return renderFormat(ast);
};

export default generateDifference;
