import { renderSquare } from "../../components/Square";
import { boardSize } from "../../enum";
import { AgentPositions } from "../../interfaces/AgentPositions";
import { useBoardStore } from "../../state/BoardStore";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { generateMapAssetInstanceDTO } from "../../utils/generate-map-asset-instance-dto";
import { useAppStore } from "../../state/AppStore";
import { ColumnNumbers, Container, NumberCell, RowNumbers, SquaresContainer } from "./styles";
import useLocalScenes from "../../hooks/use-local-scenes";

interface BoardProps {
  hidden: boolean;
}

export default function Board({ hidden }: BoardProps) {
  const { agentPositions, mapAssetPositions } = useBoardStore((state) => state);
  const { currentScene } = useAppStore((state) => state);
  const { updateMapAssetData } = useLocalScenes();

  const [squares, setSquares] = useState<JSX.Element[]>([]); // You can define a proper type for squares

  const debouncedSyncMapAssetRef = useRef(
    debounce(async (mapAssetPositions) => {
      console.log("syncing map asset.");
      if (!currentScene?.id) { throw new Error("No current scene"); }
      console.log("syncing map asset..");
      const mapAssetInstanceData = generateMapAssetInstanceDTO(currentScene?.id, mapAssetPositions);
      updateMapAssetData(currentScene.id, mapAssetInstanceData);
      // postMapAssetInstance(mapAssetInstanceData);
    }, 1000)
  );

  // useEffect(() => {
  //   debouncedSyncMapAssetRef.current = debounce(async (mapAssetPositions) => {
  //     if (!currentScene?.id) { throw new Error("No current scene"); }
  //     const mapAssetInstanceData = generateMapAssetInstanceDTO(currentScene?.id, mapAssetPositions);
  //     postMapAssetInstance(mapAssetInstanceData);
  //   }, 1000);
  // }, [currentScene?.id, socket]);


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