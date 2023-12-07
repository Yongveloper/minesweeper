import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import { CELL_STATUS, GAME_STATUS } from '../../types';
import { openCell, startGame, toggleFlag } from '../../store/gameSlice';
import * as B from './Board.styles';

function Board() {
  const board = useAppSelector((state) => state.game.board);
  const gameStatus = useAppSelector((state) => state.game.gameStatus);
  const dispatch = useDispatch();

  const handleClickCell = (rowIndex: number, cellIndex: number) => {
    if (gameStatus === GAME_STATUS.IDLE) {
      dispatch(startGame({ row: rowIndex, column: cellIndex }));
    } else {
      dispatch(openCell({ row: rowIndex, column: cellIndex }));
    }
  };

  const handleRightClickCell = (
    e: React.MouseEvent,
    rowIndex: number,
    cellIndex: number
  ) => {
    e.preventDefault();
    dispatch(toggleFlag({ row: rowIndex, column: cellIndex }));
  };

  return (
    <B.Container>
      {board.map((row, i) => (
        <B.Row key={i}>
          {row.map((cell, j) => (
            <B.Cell
              $isOpen={cell.status === CELL_STATUS.VISIBLE}
              $isMine={cell.mine}
              key={j}
              onClick={() => handleClickCell(i, j)}
              onContextMenu={(e) => handleRightClickCell(e, i, j)}
            >
              {cell.status === CELL_STATUS.FLAGGED && '🚩'}
              {cell.status === CELL_STATUS.VISIBLE && cell.mine && '💣'}
              {cell.status === CELL_STATUS.VISIBLE &&
                cell.count > 0 &&
                cell.count}
            </B.Cell>
          ))}
        </B.Row>
      ))}
    </B.Container>
  );
}

export default Board;
