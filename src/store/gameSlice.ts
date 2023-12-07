import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GAME_STATUS, GameState, LEVELS } from '../types';
import { createBoard, updateCellStatus } from '../utils';

const initialState: GameState = {
  board: Array.from({ length: 8 }, () =>
    Array.from(
      { length: 8 },
      () =>
        ({
          status: 'hidden',
          mine: false,
          count: 0,
        })!
    )
  ),
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
    setBoard: (
      state,
      action: PayloadAction<{ level: string; row: number; column: number }>
    ) => {
      const { level, row, column } = action.payload;
      switch (level) {
        case LEVELS.BEGINNER:
          state.gameLevel = {
            level: LEVELS.BEGINNER,
            rows: 8,
            columns: 8,
            mines: 10,
          };
          break;
        case LEVELS.INTERMEDIATE:
          state.gameLevel = {
            level: LEVELS.INTERMEDIATE,
            rows: 16,
            columns: 16,
            mines: 40,
          };
          break;
        case LEVELS.EXPERT:
          state.gameLevel = {
            level: LEVELS.EXPERT,
            rows: 16,
            columns: 32,
            mines: 100,
          };
          break;
        // Todo
        case LEVELS.CUSTOM:
          state.gameLevel = {
            level: LEVELS.CUSTOM,
            rows: 1,
            columns: 1,
            mines: 1,
          };
          break;
      }

      state.board = createBoard(
        state.gameLevel.rows,
        state.gameLevel.columns,
        state.gameLevel.mines,
        { row, column }
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
        return;
      }
      state.board = updateCellStatus(state.board, { row, column });
    },
  },
});

export const { setBoard, openCell } = gameSlice.actions;

export default gameSlice.reducer;
