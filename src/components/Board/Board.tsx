import { useAppSelector } from '@hooks/useAppSelector';
import * as B from './Board.styles';
import Cell from '../Cell';

function Board() {
  const board = useAppSelector((state) => state.game.board);

  return (
    <B.Container>
      {board.map((row, i) => (
        <B.Row key={i}>
          {row.map((cell, j) => (
            <Cell key={j} row={i} column={j} cell={cell} />
          ))}
        </B.Row>
      ))}
    </B.Container>
  );
}

export default Board;
