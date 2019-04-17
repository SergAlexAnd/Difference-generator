import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

export default (filePath) => {
  const ext = path.extname('firstFilePath');
  const readedFile = fs.readFileSync(path.resolve(filePath), 'UTF-8');
  if (ext === '.yaml') return yaml.safeLoad(readedFile);
  if (ext === '.json') return JSON.parse(readedFile);
  return JSON.parse(readedFile);
};
