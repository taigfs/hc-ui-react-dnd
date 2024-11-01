import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

import { MapAsset } from "./MapAsset";
import { ItemTypes } from "../enum";
import { AgentItemProps } from "../interfaces/AgentItem";
import { useBoardStore } from "../state/BoardStore";
import { useAppStore } from "../state/AppStore";
import { generatePatchAgentInstanceDTO } from "../utils/generate-patch-agent-instance-dto";
import { useDiagramStore } from "../state/DiagramStore";
import { uuidv4 } from "../utils/uuidv4";
import { useLocalAgents } from "../hooks/use-local-agents";

interface BoardSquareProps {
  x: number;
  y: number;
  children: React.ReactElement;
}

export default function BoardSquare({ x, y, children }: BoardSquareProps) {
  const [previewMapAsset, setPreviewMapAsset] = useState<boolean>(false);
  const {
    setMapAsset: setMapAssetStore,
    activeMapAssetButton,
    isMouseDown,
    mapAssetPositions,
  } = useBoardStore((state) => state);
  const { setSelectedAgentInstance } = useDiagramStore((state) => state);
  const { agents, create: createAgent, update: updateAgent, get: getAgent, canMoveAgent } = useLocalAgents();
  const { currentStory, currentScene } = useAppStore((state) => state);
  const isActiveMapAssetButtonAMapAsset = parseInt(activeMapAssetButton as any, 10) >= 1 && parseInt(activeMapAssetButton as any, 10) <= 16;

  const addAgent = (x: number, y: number, sprite: string, name: string) => {
    if (!currentStory?.id) { throw new Error("No current story"); }
    if (!currentStory?.projectId) { throw new Error("No current project"); }

    createAgent({
      storyId: currentStory.id,
      agentSpriteId: sprite,
      data: { name, x, y },
    }, currentStory.projectId);
  };

  const setAgentXY = async (agentId: string, x: number, y: number) => {
    const agent = await getAgent(agentId);
    if (!agent) { throw new Error("No agent"); }
    const agentInstanceData = generatePatchAgentInstanceDTO(agent, x, y);
    updateAgent(agentInstanceData);
  };

  const setMapAsset = (x: number, y: number, sprite: string) => {
    setMapAssetStore(x, y, sprite);
  }

  const onClick = () => {
    if (isActiveMapAssetButtonAMapAsset) {
      setMapAsset(x, y, activeMapAssetButton as string);
    }
    setSelectedAgentInstance(null);
  }

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

  const dropFn = ({ type, agentId, sprite }: AgentItemProps) => {
    if (type === ItemTypes.AGENT) {
      setAgentXY(agentId, x, y);
    } else if (type === ItemTypes.AGENT_BUTTON) {
      const name = `Agent ${agents.length + 1}`;
      addAgent(x, y, sprite, name);
    }
  };

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [ItemTypes.AGENT, ItemTypes.AGENT_BUTTON],
      canDrop: () => canMoveAgent(x, y),
      drop: dropFn,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y, agents]
  );

  useEffect(() => {
    setPreviewMapAsset(false);
  }, [mapAssetPositions, currentScene?.id, currentStory?.id]);

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
