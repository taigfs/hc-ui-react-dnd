import styled from "styled-components";

import { renderSquare } from "../../components/Square";
import { boardSize } from "../../enum";
import { AgentPositions } from "../../interfaces/AgentPositions";
import { useBoardStore } from "../../state/BoardStore";
import { useContext, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { generateMapAssetInstanceDTO } from "../../utils/generate-map-asset-instance-dto";
import { usePostMapAssetInstance } from "../../hooks/use-scene";
import { useAppStore } from "../../state/AppStore";
import { SocketContext } from "../../providers/socket-provider";
import { ColumnNumbers, Container, NumberCell, RowNumbers, SquaresContainer } from "./styles";

interface BoardProps {
  hidden: boolean;
}

export default function Board({ hidden }: BoardProps) {
  const { agentPositions, mapAssetPositions } = useBoardStore((state) => state);
  const { mutate: postMapAssetInstance } = usePostMapAssetInstance();
  const { currentScene } = useAppStore((state) => state);
  const socket = useContext(SocketContext);

  const [squares, setSquares] = useState<JSX.Element[]>([]); // You can define a proper type for squares

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


  useEffect(() => {
    const newSquares = [];
    const numberOfCells = Math.pow(boardSize, 2);

    for (let i = 0; i < numberOfCells; i++) {
      newSquares.push(renderSquare(i, agentPositions, mapAssetPositions, debouncedSyncMapAssetRef.current));
    }
    
    setSquares(newSquares);
  }, [agentPositions, mapAssetPositions]);

  const rowNumbers = [];
  const colNumbers = [];
  for (let i = 1; i <= boardSize; i++) {
    rowNumbers.push(i);
    colNumbers.push(i);
  }

  return (
    <Container hidden={hidden}>
      <RowNumbers>
        {rowNumbers.map((rowNumber) => (
          <NumberCell key={rowNumber}>{rowNumber}</NumberCell>
        ))}
      </RowNumbers>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ColumnNumbers>
          {colNumbers.map((colNumber) => (
              <NumberCell key={colNumber}>{colNumber}</NumberCell>
            ))}
        </ColumnNumbers>
        <SquaresContainer>
        {squares}
        </SquaresContainer>
      </div>
    </Container>
  );
}

export function canMoveAgent(
  x: number,
  y: number,
  agentPositions: AgentPositions
) {
  return !agentPositions.some(({ x: px, y: py }) => px === x && py === y);
}