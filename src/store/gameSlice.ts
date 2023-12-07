import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CELL_STATUS, GAME_STATUS, GameState, LEVELS } from '../types';
import {
  setBoardMinesAndCounts,
  initializeBoard,
  updateCellStatus,
} from '../utils';

const initialState: GameState = {
  board: initializeBoard(8, 8),
  gameStatus: 'idle',
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
        // Todo
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
    },
    openCell: (
      state,
      action: PayloadAction<{ row: number; column: number }>
    ) => {
      const { row, column } = action.payload;
      if (state.board[row][column].mine) {
        state.gameStatus = GAME_STATUS.LOST;
        state.board.forEach((row) => {
          row.forEach((cell) => {
            if (cell.status === CELL_STATUS.HIDDEN) {
              cell.status = CELL_STATUS.VISIBLE;
            }
          });
        });
      } else {
        state.board = updateCellStatus(state.board, { row, column });
      }
    },
  },
});

export const { resetGame, startGame, openCell } = gameSlice.actions;

export default gameSlice.reducer;
