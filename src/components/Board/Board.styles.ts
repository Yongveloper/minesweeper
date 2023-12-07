import styled from 'styled-components';

export const Container = styled.div``;

export const Cell = styled.button<{ $isOpen: boolean; $isMine: boolean }>`
  background-color: ${({ $isOpen }) => ($isOpen ? '#ecf0f1' : '#95a5a6')};
  background-color: ${({ $isOpen, $isMine }) =>
    $isOpen && $isMine && '#e74c3c'};
  border-width: ${({ $isOpen }) => $isOpen && 'none'};
  font-size: 16px;
`;

export const Row = styled.div`
  display: flex;
`;
