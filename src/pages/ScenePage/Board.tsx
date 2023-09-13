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
import useLocalMapAssets from "../../hooks/use-local-map-assets";
import { useLocalAgents } from "../../hooks/use-local-agents";
import { agentInstancesToAgentPositions } from "../../utils/agent-instance-to-agent-position";

interface BoardProps {
  hidden: boolean;
}

export default function Board({ hidden }: BoardProps) {
  const { mapAssetPositions } = useBoardStore((state) => state);
  const { currentScene, currentStory } = useAppStore((state) => state);
  const { updateMapAssetData } = useLocalScenes();
  const { get: getMapAsset } = useLocalMapAssets();
  const { agents, getAll: getAllAgents } = useLocalAgents();

  const [squares, setSquares] = useState<JSX.Element[]>([]); // You can define a proper type for squares

  useEffect(() => {
    if (currentScene?.id) {
      getMapAsset(currentScene.id);
    }
  }, [currentScene?.id]);

  useEffect(() => {
    if (currentStory?.id) {
      getAllAgents(currentStory.id);
    }
  }, [currentStory?.id]);

  const debouncedUpdateMapAssetData = debounce(updateMapAssetData, 1000);

  useEffect(() => {
    if (!currentScene?.id) { throw new Error("No current scene"); }
    const mapAssetInstanceData = generateMapAssetInstanceDTO(currentScene?.id, mapAssetPositions);
    debouncedUpdateMapAssetData(currentScene.id, mapAssetInstanceData);
  }, [mapAssetPositions, currentScene?.id]);


  useEffect(() => {
    const newSquares = [];
    const numberOfCells = Math.pow(boardSize, 2);

    const agentPositions = agentInstancesToAgentPositions(agents);
    console.log(agentPositions);

    for (let i = 0; i < numberOfCells; i++) {
      newSquares.push(renderSquare(i, agentPositions, mapAssetPositions));
    }
    
    setSquares(newSquares);
  }, [agents, mapAssetPositions]);

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