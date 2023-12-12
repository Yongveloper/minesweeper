import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector';
import { openCell, startGame, toggleFlag } from '@/store/gameSlice';
import { CELL_STATUS, Cell as CellType, GAME_STATUS } from '@/types';
import * as C from './Cell.styles';

interface ICellProps {
  row: number;
  column: number;
  cell: CellType;
}

function Cell({ row, column, cell }: ICellProps) {
  const dispatch = useDispatch();
  const gameStatus = useAppSelector((state) => state.game.gameStatus);

  const handleClick = () => {
    if (gameStatus === GAME_STATUS.IDLE) {
      dispatch(startGame({ row, column }));
    } else {
      dispatch(openCell({ row, column }));
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFlag({ row, column }));
  };

  return (
    <C.Cell
      $isOpen={cell.status === CELL_STATUS.VISIBLE}
      $isMine={cell.mine}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {cell.status === CELL_STATUS.FLAGGED && '🚩'}
      {cell.status === CELL_STATUS.VISIBLE && cell.mine && '💣'}
      {cell.status === CELL_STATUS.VISIBLE && cell.count > 0 && cell.count}
    </C.Cell>
  );
}

export default React.memo(Cell);
