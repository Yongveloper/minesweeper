import { useState, useEffect } from 'react';
import * as M from './Modal.styles';

interface IModalProps {
  close: () => void;
}

function Modal({ close }: IModalProps) {
  const [row, setRow] = useState(8);
  const [column, setColumn] = useState(8);
  const [mine, setMine] = useState(10);
  const [isError, setIsError] = useState(false);

  const handleChangeRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRow(value);
  };

  const handleChangeColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setColumn(value);
  };

  const handleChangeMine = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMine(value);
  };

  const handleComplete = () => {
    close();
  };

  useEffect(() => {
    if (
      row < 8 ||
      row > 100 ||
      column < 8 ||
      column > 100 ||
      mine > (row * column) / 3
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [row, column, mine]);

  return (
    <M.Background onClick={close}>
      <M.Card onClick={(e) => e.stopPropagation()}>
        <M.TitleContainer>
          <h2>직접 설정</h2>
          <h3>최소 8 x 8, 최대 100 x 100 이며,</h3>
          <h3>지뢰수는 격자칸 수의 1/3 이하로 설정 가능합니다.</h3>
        </M.TitleContainer>
        <M.ContentsContainer>
          <div className="input-container">
            <span>행:</span>
            <input type="number" value={row} onChange={handleChangeRow} />
          </div>
          <div className="input-container">
            <span>열:</span>
            <input type="number" value={column} onChange={handleChangeColumn} />
          </div>
          <div className="input-container">
            <span>지뢰 갯수:</span>
            <input type="number" value={mine} onChange={handleChangeMine} />
          </div>
          <M.Button
            onClick={handleComplete}
            $isDisabled={isError}
            disabled={isError}
          >
            완료
          </M.Button>
        </M.ContentsContainer>
      </M.Card>
    </M.Background>
  );
}

export default Modal;
