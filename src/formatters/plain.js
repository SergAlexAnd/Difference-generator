const renderValue = (value) => {
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const render = (keys, parent = '') => {
  const strings = keys.map(({
    type, key, value, afterValue, children,
  }) => {
    const path = `${parent}${key}`;
    switch (type) {
      case 'plus':
        return `Property '${path}' was added with value: ${renderValue(value)}\n`;
      case 'minus':
        return `Property '${path}' was removed\n`;
      case 'changed':
        return `Property '${path}' was updated. From ${renderValue(value)} to ${renderValue(afterValue)}\n`;
      case 'hasChildren':
        return render(children, `${path}.`);
      default:
        break;
    }
    return null;
  });

  return `${strings.join('')}`;
};

export default render;
