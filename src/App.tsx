import styled from 'styled-components';
import Header from './components/Header';
import Board from './components/Board/Board';
import Footer from './components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  background-color: #dfe6e9;
  border: 5px solid #b2bec3;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

function App() {
  return (
    <>
      <Container>
        <Header />
        <Board />
      </Container>
      <Footer />
    </>
  );
}

export default App;
