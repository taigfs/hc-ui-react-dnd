import styled from "styled-components";
import { boardDimensions } from "../../enum";

interface ContainerProps {
  hidden: boolean;
}
export const Container = styled.div<ContainerProps>`
  display: ${({ hidden }) => (hidden ? `none` : `flex`)};
  flex-direction: column;
  overflow: hidden;
  align-items: end;
  justify-content: flex-end;
  position: relative;
  width: ${({ theme }) => `calc(${theme.boardSize} + ${theme.squareSize})`};
  height: ${({ theme }) => `calc(${theme.boardSize} + ${theme.squareSize})`};
  background-color: ${({ theme }) => theme.color.squareBg};
  border: 1px solid ${({ theme }) => theme.color.squareBorder}; 
`;

export const SquaresContainer = styled.div`
  width: ${boardDimensions[0]}px;
  height: ${boardDimensions[1]}px;
  position: relative;
`;

export const RowNumbers = styled.div`
  display: flex;
`;

export const ColumnNumbers = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NumberCell = styled.div`
  width: ${({ theme }) => theme.squareSize};
  height: ${({ theme }) => theme.squareSize};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.squareBg};
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;