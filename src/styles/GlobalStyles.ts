import * as styled from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyles = styled.createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #8c7ae6;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none !important;
    background-color: #b2bec3;
    cursor: pointer;
    border-width: 2px;
    width: 32px;
    height: 32px;
  }
`;
