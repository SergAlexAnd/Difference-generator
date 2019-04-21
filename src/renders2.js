const renderValue = (value, spaces) => {
  const isObject = typeof value === 'object';
  if (!isObject) return value;
  const valueKeys = Object.keys(value).map(key => `${' '.repeat(spaces + 6)}${key}: ${value[key]}\n`);
  return `{\n${valueKeys.join('')}${' '.repeat(spaces + 3)}}`;
};

const render = (keys, spaces = 0) => {
  const strings = keys.map(({
    type, key, value, afterValue, children,
  }) => {
    const renderKeyValue = (sign, val) => `${' '.repeat(spaces)} ${sign} ${key}: ${renderValue(val, spaces)}\n`;
    switch (type) {
      case 'plus':
        return renderKeyValue('+', value);
      case 'minus':
        return renderKeyValue('-', value);
      case 'notChanged':
        return renderKeyValue(' ', value);
      case 'changed':
        return `${renderKeyValue('+', afterValue)}${renderKeyValue('-', value)}`;
      case 'hasChildren':
        return `${' '.repeat(spaces + 3)}${key}: ${render(children, spaces + 3)}\n`;
      default:
        break;
    }
    return null;
  });
  return `{\n${strings.join('')}${' '.repeat(spaces)}}`;
};

export default render;
