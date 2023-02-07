import styled from "styled-components";
import { renderSquare } from "./Square";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface BoardProps {
  knightPosition: [number, number]
}

export default function Board ({ knightPosition }: BoardProps) {

  const squares = []
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        {squares}
      </Container>
    </DndProvider>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;