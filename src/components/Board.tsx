import styled from "styled-components";
import { renderSquare } from "./Square";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { boardSize } from "../enum";

interface BoardProps {
  knightPosition: [number, number]
}

export default function Board ({ knightPosition }: BoardProps) {

  const numberOfCells = Math.pow(boardSize, 2);
  const squares = []
  for (let i = 0; i < numberOfCells; i++) {
    squares.push(renderSquare(i, knightPosition))
  }

  return (
    <Container>
      {squares}
    </Container>
  );
}

const Container = styled.div`
  width: ${({ theme }) => theme.boardSize};
  height: ${({ theme }) => theme.boardSize};
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;