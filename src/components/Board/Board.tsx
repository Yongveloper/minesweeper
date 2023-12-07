import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import { CELL_STATUS, GAME_STATUS } from '../../types';
import { openCell, startGame } from '../../store/gameSlice';

const Container = styled.div``;

const Cell = styled.button<{ $isOpen: boolean; $isMine: boolean }>`
  background-color: ${({ $isOpen }) => ($isOpen ? '#ecf0f1' : '#95a5a6')};
  background-color: ${({ $isOpen, $isMine }) =>
    $isOpen && $isMine && '#e74c3c'};
  border-width: ${({ $isOpen }) => $isOpen && 'none'};
  font-size: 16px;
`;

const Row = styled.div`
  display: flex;
`;

function Board() {
  const board = useAppSelector((state) => state.game.board);
  const gameStatus = useAppSelector((state) => state.game.gameStatus);
  const gameLevel = useAppSelector((state) => state.game.gameLevel.level);
  const dispatch = useDispatch();

  const handleClickCell = (rowIndex: number, cellIndex: number) => {
    if (gameStatus === GAME_STATUS.IDLE) {
      dispatch(
        startGame({ level: gameLevel, row: rowIndex, column: cellIndex })
      );
    } else {
      dispatch(openCell({ row: rowIndex, column: cellIndex }));
    }
  };

  console.log(board);

  return (
    <Container>
      {board.map((row, i) => (
        <Row key={i}>
          {row.map((cell, j) => (
            <Cell
              $isOpen={cell.status === CELL_STATUS.VISIBLE}
              $isMine={cell.mine}
              key={j}
              onClick={() => handleClickCell(i, j)}
            >
              {cell.status === CELL_STATUS.VISIBLE && cell.mine && '💣'}
              {cell.status === CELL_STATUS.VISIBLE &&
                cell.count > 0 &&
                cell.count}
            </Cell>
          ))}
        </Row>
      ))}
    </Container>
  );
}

export default Board;
