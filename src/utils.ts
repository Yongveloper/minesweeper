import { Cell } from './types';

const setMines = (
  board: Cell[][],
  mines: number,
  firstClick: { row: number; column: number }
): Cell[][] => {
  const rows = board.length;
  const columns = board[0].length;
  let countMine = 0;

  while (countMine < mines) {
    const row = Math.floor(Math.random() * rows);
    const column = Math.floor(Math.random() * columns);
    if (
      (row === firstClick.row && column === firstClick.column) ||
      board[row][column].mine
    ) {
      continue;
    }

    board[row][column].mine = true;
    countMine++;
  }

  return board;
};

const getSurroundingMineCount = (
  board: Cell[][],
  row: number,
  column: number
): number => {
  const rows = board.length;
  const columns = board[0].length;
  let mineCount = 0;

  const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

  for (let i = 0; i < 8; i++) {
    const newRow = row + dx[i];
    const newColumn = column + dy[i];

    if (newRow < 0 || newRow >= rows || newColumn < 0 || newColumn >= columns) {
      continue;
    }

    if (board[newRow][newColumn].mine) {
      mineCount++;
    }
  }

  return mineCount;
};

const calculateCounts = (board: Cell[][]): Cell[][] => {
  const rows = board.length;
  const columns = board[0].length;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (!board[row][column].mine) {
        board[row][column].count = getSurroundingMineCount(board, row, column);
      }
    }
  }

  return board;
};

export const createBoard = (
  rows: number,
  columns: number,
  mines: number,
  firstClick: { row: number; column: number }
): Cell[][] => {
  let board: Cell[][] = Array.from({ length: rows }, () =>
    Array.from(
      { length: columns },
      () =>
        ({
          status: 'hidden',
          mine: false,
          count: 0,
        }) as Cell
    )
  );

  board = setMines(board, mines, firstClick);
  board = calculateCounts(board);

  return board;
};
