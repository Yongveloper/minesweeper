import * as M from './Modal.styles';

function Modal() {
  return (
    <M.Background>
      <M.Card>
        <M.TitleContainer>
          <h2>직접 설정</h2>
          <h3>최소 8 x 8, 최대 100 x 100 이며,</h3>
          <h3>지뢰수는 격자칸 수의 1/3 이하로 설정 가능합니다.</h3>
        </M.TitleContainer>
        <M.ContentsContainer>
          <div className="input-container">
            <span>행:</span>
            <input type="number" max={100} />
          </div>
          <div className="input-container">
            <span>열:</span>
            <input type="text" />
          </div>
          <div className="input-container">
            <span>지뢰 갯수:</span>

            <input type="text" />
          </div>
          <button>완료</button>
        </M.ContentsContainer>
      </M.Card>
    </M.Background>
  );
}

export default Modal;
