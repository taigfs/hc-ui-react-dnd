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
  const rowNumbers = [];
  const colNumbers = [];
  for (let i = 0; i < numberOfCells; i++) {
    squares.push(renderSquare(i, agentPositions, mapAssetPositions, debouncedSyncMapAssetRef.current));
  }

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

interface ContainerProps {
  hidden: boolean;
}
const Container = styled.div<ContainerProps>`
  display: ${({ hidden }) => (hidden ? `none` : `flex`)};
  flex-direction: column;
  align-items: end;
  justify-content: flex-end;
  position: relative;
  overflow: auto;
  width: ${({ theme }) => `calc(${theme.boardSize} + ${theme.squareSize})`};
  height: ${({ theme }) => `calc(${theme.boardSize} + ${theme.squareSize})`};
  background-color: ${({ theme }) => theme.color.squareBg};
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;


const SquaresContainer = styled.div`
  width: ${({ theme }) => theme.boardSize};
  height: ${({ theme }) => theme.boardSize};
  display: ${({ hidden }) => (hidden ? `none` : `flex`)};
  flex-wrap: wrap;
`;

const RowNumbers = styled.div`
  display: flex;
`;

const ColumnNumbers = styled.div`
  display: flex;
  flex-direction: column;
`;

const NumberCell = styled.div`
  width: ${({ theme }) => theme.squareSize};
  height: ${({ theme }) => theme.squareSize};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.squareBg};
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;
