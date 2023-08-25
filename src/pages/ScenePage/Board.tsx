import styled from "styled-components";

import { renderSquare } from "../../components/Square";
import { boardSize } from "../../enum";
import { AgentPositions } from "../../interfaces/AgentPositions";
import { useBoardStore } from "../../state/BoardStore";
import { useContext, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { generateMapAssetInstanceDTO } from "../../utils/generate-map-asset-instance-dto";
import { usePostMapAssetInstance } from "../../hooks/use-scene";
import { useAppStore } from "../../state/AppStore";
import { SocketContext } from "../../providers/socket-provider";

interface BoardProps {
  hidden: boolean;
}

export default function Board({ hidden }: BoardProps) {
  const { agentPositions, mapAssetPositions } = useBoardStore((state) => state);
  const { mutate: postMapAssetInstance } = usePostMapAssetInstance();
  const { currentScene } = useAppStore((state) => state);
  const socket = useContext(SocketContext);
  
  const debouncedSyncMapAssetRef = useRef(
    debounce(async (mapAssetPositions) => {
      const mapAssetInstanceData = generateMapAssetInstanceDTO(currentScene?.id || 0, mapAssetPositions);
      postMapAssetInstance(mapAssetInstanceData);
    }, 1000)
  );

  useEffect(() => {
    debouncedSyncMapAssetRef.current = debounce(async (mapAssetPositions) => {
      const mapAssetInstanceData = generateMapAssetInstanceDTO(currentScene?.id || 0, mapAssetPositions);
      postMapAssetInstance(mapAssetInstanceData);
    }, 1000);
  }, [currentScene?.id, socket]);

  const numberOfCells = Math.pow(boardSize, 2);
  const squares = [];
  for (let i = 0; i < numberOfCells; i++) {
    squares.push(renderSquare(i, agentPositions, mapAssetPositions, debouncedSyncMapAssetRef.current));
  }

  return <Container hidden={hidden}>{squares}</Container>;
}

export function canMoveAgent(
  x: number,
  y: number,
  agentPositions: AgentPositions
) {
  return !agentPositions.some(({ x: px, y: py }) => px === x && py === y);
}

interface ContainerProps {
  hidden: boolean;
}

const Container = styled.div<ContainerProps>`
  width: ${({ theme }) => theme.boardSize};
  height: ${({ theme }) => theme.boardSize};
  display: ${({ hidden }) => (hidden ? `none` : `flex`)};
  flex-wrap: wrap;
`;
