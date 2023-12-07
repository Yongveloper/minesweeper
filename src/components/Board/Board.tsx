import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { CELL_STATUS, GAME_STATUS, LEVELS } from '../../types';
import { setBoard } from '../../store/gameSlice';

const Container = styled.div``;

const Cell = styled.button<{ $isOpen: boolean }>`
  background-color: ${({ $isOpen }) => ($isOpen ? '#ecf0f1' : 'inherit')};
`;

const Row = styled.div`
  display: flex;
`;

function Board() {
  const board = useSelector((state: RootState) => state.game.board);
  const gameStatus = useSelector((state: RootState) => state.game.gameStatus);
  const dispatch = useDispatch();

  const handleClickCell = (rowIndex: number, cellIndex: number) => {
    if (gameStatus === GAME_STATUS.IDLE) {
      dispatch(
        setBoard({ level: LEVELS.BEGINNER, row: rowIndex, column: cellIndex })
      );
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
              key={j}
              onClick={() => handleClickCell(i, j)}
            >
              {cell.mine ? '💣' : cell.count}
            </Cell>
          ))}
        </Row>
      ))}
    </Container>
  );
}

export default Board;
