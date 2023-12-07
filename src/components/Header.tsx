import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 5px solid #b2bec3;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

function Header() {
  return (
    <Container>
      <div className="mine-count">000</div>
      <button className="reset-button">😊</button>
      <div className="time">000</div>
    </Container>
  );
}

export default Header;
