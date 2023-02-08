import React from 'react'
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../enum';
import { AgentItemProps } from '../interfaces/AgentItem';
import { useBoardStore } from '../state/store';
import { canMoveAgent } from './Board';

interface BoardSquareProps {
  x: number;
  y: number;
  children: React.ReactElement;
}

export default function BoardSquare({ x, y, children }: BoardSquareProps) {

  const { setAgentPosition, addAgent, agentPositions } = useBoardStore((state) => state);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [ItemTypes.AGENT, ItemTypes.AGENT_BUTTON],
      canDrop: () => canMoveAgent(x, y, agentPositions),
      drop: ({ type, agentIndex, sprite }: AgentItemProps) => {
        if (type === ItemTypes.AGENT) {
          setAgentPosition(agentIndex, x, y);
        } else if (type === ItemTypes.AGENT_BUTTON) {
          addAgent(x, y, sprite);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    [x, y, agentPositions]
  );

  return (
    <Container
      key={`${x}-${y}`}
      ref={drop}
      isOver={isOver}
      canDrop={canDrop}
    >
      {children}
    </Container>
  );
}

interface ContainerProps {
  isOver: boolean;
  canDrop: boolean;
}

const Container = styled.div<ContainerProps>`
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

  ${({ isOver, canDrop, theme }) => isOver && !canDrop ? `border-color: ${theme.color.blockedSquareBorder};` : ``}
`;