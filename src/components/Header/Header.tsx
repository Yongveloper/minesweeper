import { useSelector, useDispatch } from 'react-redux';
import * as H from './Header.styles';
import { resetGame } from '../../store/gameSlice';
import { RootState } from '../../store/store';
import { GAME_STATUS } from '../../types';

function Header() {
  const gameLevel = useSelector((state: RootState) => state.game.gameLevel);
  const gameStatus = useSelector((state: RootState) => state.game.gameStatus);
  const dispatch = useDispatch();

  const handleResetGame = () => {
    if (gameStatus === GAME_STATUS.IDLE) {
      return;
    }
    dispatch(resetGame(gameLevel));
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
