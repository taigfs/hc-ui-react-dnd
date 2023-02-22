import React from "react";
import styled from "styled-components";

import { boardSize, cellSize } from "../enum";

export const KaboomGrid: React.FC = () => {
  const verticalLines = [];
  const horizontalLines = [];

  for (let index = 0; index <= boardSize; index++) {
    verticalLines.push(<VerticalLine key={index} i={index} />);
    horizontalLines.push(<HorizontalLine key={index} i={index} />);
  }
  return (
    <Container>
      {verticalLines}
      {horizontalLines}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 100%;
  height: 100%;
`;

interface LineProps {
  i: number;
}

const VerticalLine = styled.div<LineProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ i }) => i * cellSize}px;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;

const HorizontalLine = styled.div<LineProps>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({ i }) => i * cellSize}px;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;
