import * as H from './Header.styles';

function Header() {
  return (
    <H.Container>
      <div className="mine-count">000</div>
      <button className="reset-button">😊</button>
      <div className="time">000</div>
    </H.Container>
  );
}

export default Header;
