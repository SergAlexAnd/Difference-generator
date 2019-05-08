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
      case 'added':
        return `Property '${path}' was added with value: ${renderValue(value)}`;
      case 'removed':
        return `Property '${path}' was removed`;
      case 'changed':
        return `Property '${path}' was updated. From ${renderValue(value)} to ${renderValue(afterValue)}`;
      case 'hasChildren':
        return render(children, `${path}.`);
      case 'notChanged':
        return null;
      default:
        throw new Error('Invalid item type');
    }
  }).filter(str => str !== null);

  return `${strings.join('\n')}`;
};

export default render;
