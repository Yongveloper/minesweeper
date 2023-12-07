import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import * as H from './Header.styles';
import { resetGame } from '../../store/gameSlice';
import { GAME_STATUS } from '../../types';

function Header() {
  const gameLevel = useAppSelector((state) => state.game.gameLevel.level);
  const gameStatus = useAppSelector((state) => state.game.gameStatus);
  const dispatch = useDispatch();

  const handleResetGame = () => {
    if (gameStatus === GAME_STATUS.IDLE) {
      return;
    }
    dispatch(resetGame({ level: gameLevel }));
  };

  return (
    <H.Container>
      <div className="mine-count">000</div>
      <button className="reset-button" onClick={handleResetGame}>
        😊
      </button>
      <div className="time">000</div>
    </H.Container>
  );
}

export default Header;
