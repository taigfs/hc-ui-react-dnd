import React from 'react'
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../enum';
import { useGameStore } from '../state/store';

interface BoardSquareProps {
  x: number;
  y: number;
  black: boolean;
  children: React.ReactElement;
}

export default function BoardSquare({ x, y, black, children }: BoardSquareProps) {

  const setKnightPosition = useGameStore((state) => state.setKnightPosition);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      drop: () => setKnightPosition(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [x, y]
  );

  return (
    <Container 
      onClick={() => setKnightPosition(x, y)} 
      key={`${x}-${y}`} 
      black={black} 
      ref={drop}
      isOver={isOver}
    >
      {children}
    </Container>
  );
}

interface ContainerProps {
  black: boolean;
  isOver: boolean;
}

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  width: 12.5%;
  height: 12.5vh;
  font-size: 56pt;
  text-align: center;
  ${({ black }) => black ? `
    background-color: black;
    color: white;
    ` : `
    background-color: white;
    color: black;
  `}

  ${({ isOver }) => isOver ? `background-color: yellow; opacity: 0.5;` : ``}
`;