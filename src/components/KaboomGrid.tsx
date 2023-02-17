import React from 'react';
import styled from 'styled-components';
import { boardDimensions, boardSize, cellSize } from '../enum';

export const KaboomGrid: React.FC = () => {
  const verticalLines = [];
  const horizontalLines = [];

  for (let index = 0; index < boardSize; index++) {
    verticalLines.push(<VerticalLine key={index} i={index} />);
    horizontalLines.push(<HorizontalLine key={index} i={index} />);    
  }
  return (
    <Container>
      {verticalLines}
      {horizontalLines}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;

interface LineProps {
  i: number;
}

const VerticalLine = styled.div<LineProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ i }) => (i+1) * cellSize}px;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;

const HorizontalLine = styled.div<LineProps>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({ i }) => (i+1) * cellSize}px;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;