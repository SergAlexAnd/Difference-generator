import _ from 'lodash/fp';
import path from 'path';
import fs from 'fs';
import getParser from './parsers';
import getRender from './formatters';

const generateAst = (beforeData, afterData) => {
  const beforeKeys = Object.keys(beforeData);
  const afterKeys = Object.keys(afterData);
  const allKeys = _.union(beforeKeys, afterKeys).sort();
  const ast = allKeys.map((key) => {
    const isBeforeHasKey = _.has(key, beforeData);
    const isAfterHasKey = _.has(key, afterData);
    const isBeforeObject = typeof beforeData[key] === 'object';
    const isAfterObject = typeof afterData[key] === 'object';
    if (isBeforeHasKey && !isAfterHasKey) return { type: 'removed', key, value: beforeData[key] };
    if (!isBeforeHasKey && isAfterHasKey) return { type: 'added', key, value: afterData[key] };
    if (beforeData[key] === afterData[key]) return { key, type: 'notChanged', value: afterData[key] };
    if (isAfterObject && isBeforeObject) {
      return { key, type: 'hasChildren', children: generateAst(beforeData[key], afterData[key]) };
    }
    return ({
      type: 'changed', key, afterValue: afterData[key], value: beforeData[key],
    });
  });
  return ast;
};

const generateDifference = (firstConfigPath, secondConfigPath, format = 'recursion') => {
  const parse = getParser(path.extname(firstConfigPath));
  const beforeData = parse(fs.readFileSync(firstConfigPath, 'UTF-8'));
  const afterData = parse(fs.readFileSync(secondConfigPath, 'UTF-8'));
  const render = getRender(format);
  const ast = generateAst(beforeData, afterData);
  return render(ast);
};

export default generateDifference;
