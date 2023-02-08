import React from 'react'
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../enum';
import { AgentItemProps } from '../interfaces/AgentItem';
import { useBoardStore } from '../state/store';

interface BoardSquareProps {
  x: number;
  y: number;
  children: React.ReactElement;
}

export default function BoardSquare({ x, y, children }: BoardSquareProps) {

  const setAgent = useBoardStore((state) => state.setAgentPosition);
  const addAgent = useBoardStore((state) => state.addAgent);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [ItemTypes.AGENT, ItemTypes.AGENT_BUTTON],
      drop: ({ type, agentIndex, sprite }: AgentItemProps) => {
        if (type === ItemTypes.AGENT) {
          setAgent(agentIndex, x, y);
        } else if (type === ItemTypes.AGENT_BUTTON) {
          addAgent(x, y, sprite);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [x, y]
  );

  return (
    <Container 
      onClick={() => setAgent(x, y)} 
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