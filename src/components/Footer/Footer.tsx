import * as F from './Footer.styles';

// - Beginner (8X8) 지뢰 10개, Intermediate (16X16) 지뢰 40개, Expert (32X16) 지뢰 100개
// - Custom (가로, 세로, 지뢰 수 조정 가능)
//     - 설정 가능한 가로, 세로는 최대 100 x 100이며, 지뢰수는 격자칸 수의 1/3 이하로 설정 가능합니다.

function Footer() {
  return (
    <F.Container>
      <h3 className="title">난이도 설정</h3>
      <F.ButtonContainer>
        <button className="beginner-btn">초보자</button>
        <button className="intermediate-btn">중급자</button>
        <button className="expert-btn">전문가</button>
        <button className="custom-btn">직접 설정</button>
      </F.ButtonContainer>
    </F.Container>
  );
}

export default Footer;
