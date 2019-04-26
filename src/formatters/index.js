import recursion from './recursion';
import plain from './plain';
import json from './json';

const FORMATS = { recursion, plain, json };

export default (format = 'recursion') => FORMATS[format];
