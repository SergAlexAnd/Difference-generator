import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

export default (filePath) => {
  const ext = path.extname(filePath);
  const readedFile = fs.readFileSync(path.resolve(filePath), 'UTF-8');
  if (ext === '.yaml') return yaml.safeLoad(readedFile);
  if (ext === '.json') return JSON.parse(readedFile);
  if (ext === '.ini') return ini.parse(readedFile);
  return JSON.parse(readedFile);
};
