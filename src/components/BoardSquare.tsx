import React, { useState } from 'react'
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../enum';
import { mapAssets, MapAssetSprites } from '../enum/MapAssets';
import { AgentItemProps } from '../interfaces/AgentItem';
import { useBoardStore } from '../state/store';
import { canMoveAgent } from './Board';
import { MapAsset } from './MapAsset';

interface BoardSquareProps {
  x: number;
  y: number;
  children: React.ReactElement;
}

export default function BoardSquare({ x, y, children }: BoardSquareProps) {

  const [previewMapAsset, setPreviewMapAsset] = useState<boolean>(false);
  const { setAgentPosition, addAgent, agentPositions, setMapAsset, activeButton, isMouseDown, setSelectedAgentIndex } = useBoardStore((state) => state);
  const isActiveButtonAMapAsset = mapAssets.includes(parseInt(activeButton as any));

  const onClick = () => {
    if (isActiveButtonAMapAsset) {
      setMapAsset(x, y, activeButton as string);
    }
    setSelectedAgentIndex(null);
  };

  const onMouseEnter = () => {
    if (isActiveButtonAMapAsset && isMouseDown) {
      setMapAsset(x, y, activeButton as string);
    } else if (isActiveButtonAMapAsset) {
      setPreviewMapAsset(true);
    }
  };

  const onMouseDown = () => isActiveButtonAMapAsset && setMapAsset(x, y, activeButton as string);

  const onMouseLeave = () => {
    if (previewMapAsset) { setPreviewMapAsset(false); }
  }

  const dropFn = ({ type, agentIndex, sprite }: AgentItemProps) => {
    if (type === ItemTypes.AGENT) {
      setAgentPosition(agentIndex, x, y);
    } else if (type === ItemTypes.AGENT_BUTTON) {
      const name = `Agent ${agentPositions.length + 1}`;
      addAgent(x, y, sprite, name);
    }
  };
  
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [ItemTypes.AGENT, ItemTypes.AGENT_BUTTON],
      canDrop: () => canMoveAgent(x, y, agentPositions),
      drop: dropFn,
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
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
    >
      { previewMapAsset && <MapAsset sprite={activeButton as string} priority={2} />}
      {children}
    </Container>
  );
}

interface ContainerProps {
  isOver: boolean;
  canDrop: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
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