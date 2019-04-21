const renderValue = (value, spaces) => {
  const isObject = typeof value === 'object';
  if (!isObject) return value;
  const valueKeys = Object.keys(value).map(key => `${' '.repeat(spaces + 6)}${key}: ${value[key]}\n`);
  return `{\n${valueKeys.join('')}${' '.repeat(spaces + 3)}}`;
};

const stringifyKeyValue = (key, value, spaces, sign) => `${' '.repeat(spaces)} ${sign} ${key}: ${renderValue(value, spaces)}\n`;

const renderKeyValue = (sign, f) => (key, value, spaces, afterValue, children) => {
  if (afterValue !== undefined) {
    return `${f(key, afterValue, spaces, '+')}${f(key, value, spaces, '-')}`;
  }
  if (children !== undefined) return `${' '.repeat(spaces)} ${sign} ${key}: ${f(children, spaces + 3)}\n`;
  return stringifyKeyValue(key, value, spaces, sign);
};

const render = (keys, spaces = 0) => {
  const returns = {
    plus: renderKeyValue('+', stringifyKeyValue),
    minus: renderKeyValue('-', stringifyKeyValue),
    changed: renderKeyValue('', stringifyKeyValue),
    notChanged: renderKeyValue(' ', stringifyKeyValue),
    hasChildren: renderKeyValue(' ', render),
  };
  const strings = keys.map(({
    type, key, value, afterValue, children,
  }) => returns[type](key, value, spaces, afterValue, children));
  return `{\n${strings.join('')}${' '.repeat(spaces)}}`;
};

export default render;
