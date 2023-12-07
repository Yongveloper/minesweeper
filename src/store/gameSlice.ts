import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CELL_STATUS,
  GAME_STATUS,
  GameState,
  GameStatus,
  LEVELS,
} from '../types';
import {
  setBoardMinesAndCounts,
  initializeBoard,
  updateCellStatus,
  checkWin,
} from '../utils';

const initialState: GameState = {
  board: initializeBoard(8, 8),
  gameStatus: GAME_STATUS.IDLE,
  gameLevel: {
    level: LEVELS.BEGINNER,
    rows: 8,
    columns: 8,
    mines: 10,
  },
};
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame: (
      state: GameState,
      action: PayloadAction<{
        level: string;
        rows?: number;
        columns?: number;
        mines?: number;
      }>
    ) => {
      const { level, rows, columns, mines } = action.payload;
      switch (level) {
        case LEVELS.BEGINNER:
          state.board = initializeBoard(8, 8);
          state.gameLevel = {
            level: LEVELS.BEGINNER,
            rows: 8,
            columns: 8,
            mines: 10,
          };
          break;
        case LEVELS.INTERMEDIATE:
          state.board = initializeBoard(16, 16);
          state.gameLevel = {
            level: LEVELS.INTERMEDIATE,
            rows: 16,
            columns: 16,
            mines: 40,
          };
          break;
        case LEVELS.EXPERT:
          state.board = initializeBoard(16, 32);
          state.gameLevel = {
            level: LEVELS.EXPERT,
            rows: 16,
            columns: 32,
            mines: 100,
          };
          break;
        case LEVELS.CUSTOM:
          state.board = initializeBoard(rows!, columns!);
          state.gameLevel = {
            level: LEVELS.CUSTOM,
            rows: rows!,
            columns: columns!,
            mines: mines!,
          };
          break;
      }
      state.gameStatus = GAME_STATUS.IDLE;
    },
    startGame: (
      state,
      action: PayloadAction<{
        row: number;
        column: number;
      }>
    ) => {
      const { row, column } = action.payload;
      state.board = setBoardMinesAndCounts(
        { row, column },
        state.board,
        state.gameLevel.mines
      );
      state.gameStatus = GAME_STATUS.RUNNING;
      state.board = updateCellStatus(state.board, { row, column });
      if (checkWin(state.board)) {
        state.gameStatus = GAME_STATUS.WON;
      }
    },
    openCell: (
      state,
      action: PayloadAction<{ row: number; column: number }>
    ) => {
      const { row, column } = action.payload;
      const cell = state.board[row][column];

      if (
        state.gameStatus !== GAME_STATUS.RUNNING ||
        cell.status === CELL_STATUS.VISIBLE ||
        cell.status === CELL_STATUS.FLAGGED
      ) {
        return;
      }

      if (cell.mine) {
        state.gameStatus = GAME_STATUS.LOST;
        state.board.forEach((row) => {
          row.forEach((cell) => {
            if (
              cell.status === CELL_STATUS.HIDDEN ||
              cell.status === CELL_STATUS.FLAGGED
            ) {
              cell.status = CELL_STATUS.VISIBLE;
            }
          });
        });
        return;
      }

      state.board = updateCellStatus(state.board, { row, column });

      if (checkWin(state.board)) {
        state.gameStatus = GAME_STATUS.WON;
      }
    },
    setGameStatus: (state: GameState, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },
    toggleFlag: (
      state,
      action: PayloadAction<{ row: number; column: number }>
    ) => {
      const { row, column } = action.payload;
      const cell = state.board[row][column];

      if (cell.status === CELL_STATUS.VISIBLE) {
        return;
      }

      cell.status =
        cell.status === CELL_STATUS.FLAGGED
          ? CELL_STATUS.HIDDEN
          : CELL_STATUS.FLAGGED;
    },
  },
});

export const { resetGame, startGame, openCell, setGameStatus, toggleFlag } =
  gameSlice.actions;

export default gameSlice.reducer;
