import React, { useState } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

import { MapAsset } from "./MapAsset";
import { ItemTypes } from "../enum";
import { mapAssets } from "../enum/MapAssets";
import { AgentItemProps } from "../interfaces/AgentItem";
import { canMoveAgent } from "../pages/ScenePage/Board";
import { useBoardStore } from "../state/BoardStore";
import { usePostMapAssetInstance } from "../hooks/use-scene";
import { MapAssetInstanceDTO } from "../dtos/map-asset-instance-dto";

interface BoardSquareProps {
  x: number;
  y: number;
  children: React.ReactElement;
}

export default function BoardSquare({ x, y, children }: BoardSquareProps) {
  const { mutate } = usePostMapAssetInstance();
  const [previewMapAsset, setPreviewMapAsset] = useState<boolean>(false);
  const {
    setAgentPosition,
    addAgent,
    agentPositions,
    setMapAsset,
    activeMapAssetButton,
    isMouseDown,
    setSelectedAgentIndex,
  } = useBoardStore((state) => state);
  const isactiveMapAssetButtonAMapAsset = mapAssets.includes(
    parseInt(activeMapAssetButton as any, 10)
  );

  const onClick = () => {
    if (isactiveMapAssetButtonAMapAsset) {
      setMapAsset(x, y, activeMapAssetButton as string);
      const mapAssetInstanceData: MapAssetInstanceDTO = {
        data: {
          x,
          y,
        },
        mapAssetSprite: {
          connect: {
            id: parseInt(activeMapAssetButton as any, 10),
          },
        },
        scene: {
          connect: {
            id: 1, // Replace with the actual scene ID
          },
        },
      };
      mutate(mapAssetInstanceData);
    }
    setSelectedAgentIndex(null);
  };

  const onMouseEnter = () => {
    if (isactiveMapAssetButtonAMapAsset && isMouseDown) {
      setMapAsset(x, y, activeMapAssetButton as string);
    } else if (isactiveMapAssetButtonAMapAsset) {
      setPreviewMapAsset(true);
    }
  };

  const onMouseDown = () =>
    isactiveMapAssetButtonAMapAsset &&
    setMapAsset(x, y, activeMapAssetButton as string);

  const onMouseLeave = () => {
    if (previewMapAsset) {
      setPreviewMapAsset(false);
    }
  };

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
        canDrop: !!monitor.canDrop(),
      }),
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
      {previewMapAsset && (
        <MapAsset sprite={activeMapAssetButton as string} priority={2} />
      )}
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
  height: ${({ theme }) => theme.squareSize};
  font-size: 32pt;
  text-align: center;
  color: white;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
  box-sizing: border-box;

  ${({ isOver, theme }) =>
    isOver
      ? `
    border-color: ${theme.color.featuredSquareBorder};
    background-color: ${theme.color.featuredSquareBg};
  `
      : `
  background-color: ${theme.color.squareBg};
  `}

  ${({ isOver, canDrop, theme }) =>
    isOver && !canDrop
      ? `border-color: ${theme.color.blockedSquareBorder};`
      : ``}
`;
