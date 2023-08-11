import React, { useState } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

import { MapAsset } from "./MapAsset";
import { ItemTypes } from "../enum";
import { AgentItemProps } from "../interfaces/AgentItem";
import { canMoveAgent } from "../pages/ScenePage/Board";
import { useBoardStore } from "../state/BoardStore";
import { usePostMapAssetInstance } from "../hooks/use-scene";
import { MapAssetInstanceDTO } from "../dtos/map-asset-instance-dto";
import { generateMapAssetInstanceDTO } from "../utils/generate-map-asset-instance-dto";

interface BoardSquareProps {
  x: number;
  y: number;
  children: React.ReactElement;
}

export default function BoardSquare({ x, y, children }: BoardSquareProps) {
  const { mutate: postMapAssetInstance } = usePostMapAssetInstance();
  const [previewMapAsset, setPreviewMapAsset] = useState<boolean>(false);
  const {
    setAgentPosition,
    addAgent,
    agentPositions,
    setMapAsset: setMapAssetStore,
    activeMapAssetButton,
    isMouseDown,
    setSelectedAgentIndex,
  } = useBoardStore((state) => state);
  const isActiveMapAssetButtonAMapAsset = parseInt(activeMapAssetButton as any, 10) >= 1 && parseInt(activeMapAssetButton as any, 10) <= 16;

  const setMapAsset = (x: number, y: number, sprite: string) => {
    setMapAssetStore(x, y, sprite);
    const mapAssetInstanceData: MapAssetInstanceDTO = generateMapAssetInstanceDTO(x, y, activeMapAssetButton as string);
    postMapAssetInstance(mapAssetInstanceData);
  }

  const onClick = () => {
    if (isActiveMapAssetButtonAMapAsset) {
      setMapAsset(x, y, activeMapAssetButton as string);
    }
    setSelectedAgentIndex(null);
  };

  const onMouseEnter = () => {
    if (isActiveMapAssetButtonAMapAsset && isMouseDown) {
      setMapAsset(x, y, activeMapAssetButton as string);
    } else if (isActiveMapAssetButtonAMapAsset) {
      setPreviewMapAsset(true);
    }
  };

  const onMouseDown = () =>
    isActiveMapAssetButtonAMapAsset &&
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
