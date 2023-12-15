## 프로젝트 개요

지뢰찾기 게임

- [배포 링크](https://minesweeper-sage.vercel.app/)

## 기능 구현

- 지뢰 찾기 기본 기능
  - 게임 시작, 승리, 패배
  - 게임 초기화
  - 주변 지뢰 갯수 표시
  - 빈 공간 클릭 시 주변 탐색
  - 난이도 설정
  - 우클릭 깃발
  - 타이머
- 첫 클릭은 지뢰가 터지지 않음
- 브라우저 새고로침 시 난이도 유지
- Area open 기능

## 프로젝트 폴더 구조

```
📦src
 ┣ 📂components
 ┃ ┣ 📂Board
 ┃ ┃ ┣ 📜Board.styles.ts
 ┃ ┃ ┣ 📜Board.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Cell
 ┃ ┃ ┣ 📜Cell.styles.ts
 ┃ ┃ ┣ 📜Cell.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Footer
 ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜Modal.styles.ts
 ┃ ┃ ┃ ┗ 📜Modal.tsx
 ┃ ┃ ┣ 📜Footer.styles.ts
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂Header
 ┃ ┃ ┣ 📜Header.styles.ts
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useAppSelector.ts
 ┃ ┗ 📜useModal.ts
 ┣ 📂store
 ┃ ┣ 📜gameSlice.ts
 ┃ ┗ 📜store.ts
 ┣ 📂styles
 ┃ ┗ 📜GlobalStyles.ts
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┣ 📜types.ts
 ┣ 📜utils.ts
 ┗ 📜vite-env.d.ts
```

- `components/`: 프로젝트의 React 컴포넌트들이 위치한 폴더입니다.
- `hooks/`: 커스텀 훅들이 위치한 폴더입니다.
- `store/`: Redux store와 관련된 파일들이 위치한 폴더입니다.
- `styles/`: 전역 스타일과 관련된 파일들이 위치한 폴더입니다.

## 설치 및 실행 방법

### 설치

```
npm i
```

### 실행

```
npm run dev
```
