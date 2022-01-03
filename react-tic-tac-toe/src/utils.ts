import { BoardState } from "./global/types";

export function createEmptyBoard(boardSize: string): BoardState {
  const REGEX = /\d[xX]\d/;

  if (!REGEX.test(boardSize)) {
    throw new Error('Invalid board size');
  }

  const [cols, rows] = boardSize.toLowerCase().split('x').map((size) => Number.parseInt(size, 10));

  return Array(rows).fill(Array(cols).fill(null));
}

export function cloneObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
