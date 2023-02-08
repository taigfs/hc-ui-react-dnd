import React from 'react'
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../enum';
import { useGameStore } from '../state/store';

interface BoardSquareProps {
  x: number;
  y: number;
  children: React.ReactElement;
}

export default function BoardSquare({ x, y, children }: BoardSquareProps) {

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
      ref={drop}
      isOver={isOver}
    >
      {children}
    </Container>
  );
}

interface ContainerProps {
  isOver: boolean;
}

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  width: ${({ theme }) => theme.squareSize};
  height: ${({ theme }) => theme.squareSize};;
  font-size: 32pt;
  text-align: center;
  color: white;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
  box-sizing: border-box;

  ${({ isOver, theme }) => isOver ? `
    border-color: ${theme.color.featuredSquareBorder};
    background-color: ${theme.color.featuredSquareBg};
  ` : `
  background-color: ${theme.color.squareBg};
  `}
`;