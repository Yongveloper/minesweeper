import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell, GAME_STATUS, GameState, LEVELS } from '../types';
import { createBoard } from '../utils';

const initialState: GameState = {
  board: Array.from({ length: 8 }, () =>
    Array.from(
      { length: 8 },
      () =>
        ({
          status: 'hidden',
          mine: false,
          count: 0,
        }) as Cell
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
      switch (action.payload.level) {
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
        { row: action.payload.row, column: action.payload.column }
      );
      state.gameStatus = GAME_STATUS.RUNNING;
    },
  },
});

export const { setBoard } = gameSlice.actions;

export default gameSlice.reducer;
