import { BoardSquare } from "./types";

export function createBoard(configStr: string): BoardSquare[][] {
  const REGEX = /\d[xX]\d/;

  if (!REGEX.test(configStr)) {
    throw new Error('Invalid board config');
  }

  const [cols, rows] = configStr.toLowerCase().split('x').map((size) => Number.parseInt(size, 10));

  return Array(rows).fill(Array(cols).fill(null));
}

export function cloneObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
