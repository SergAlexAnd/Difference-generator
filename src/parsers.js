import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

const parsers = { '.yml': yaml.safeLoad, '.json': JSON.parse, '.ini': ini.parse };

export default (filePath) => {
  const ext = path.extname(filePath);
  const readedFile = fs.readFileSync(path.resolve(filePath), 'UTF-8');
  return parsers[ext](readedFile);
};
