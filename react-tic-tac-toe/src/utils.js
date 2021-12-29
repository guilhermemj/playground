export function createBoard(configStr) {
  const REGEX = /\d[xX]\d/;

  if (!REGEX.test(configStr)) {
    throw new Error('Invalid board config');
  }

  const [cols, rows] = configStr.toLowerCase().split('x').map((size) => Number.parseInt(size, 10));

  return Array(rows).fill(Array(cols).fill(null));
}

export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
