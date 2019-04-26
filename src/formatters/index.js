import recursion from './recursion';
import plain from './plain';

const FORMATS = {
  recursion,
  plain,
};

export default (format = 'recursion') => FORMATS[format];
