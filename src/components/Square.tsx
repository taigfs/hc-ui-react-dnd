import Agent from "./Agent";
import BoardSquare from "./BoardSquare";
import { MapAsset } from "./MapAsset";
import { boardSize } from "../enum";
import { AgentPositions } from "../interfaces/AgentPositions";
import { MapAssetPositions } from "../interfaces/MapAssetPositions";

export function renderSquare(
  i: number,
  agentPositions: AgentPositions,
  mapAssetPositions: MapAssetPositions,
  syncMapAsset: any
) {
  const x = i % boardSize;
  const y = Math.floor(i / boardSize);
  return (
    <BoardSquare x={x} y={y} key={i} syncMapAsset={syncMapAsset}>
      <>
        {renderMapAsset(x, y, mapAssetPositions)}
        {renderAgent(x, y, agentPositions)}
      </>
    </BoardSquare>
  );
}

function renderAgent(x: number, y: number, agentPositions: AgentPositions) {
  const foundAgent = agentPositions.find(
    (agent) => agent.x === x && agent.y === y
  );
  return foundAgent ? (
    <Agent
      agentIndex={agentPositions.indexOf(foundAgent)}
      sprite={foundAgent.sprite}
      name={foundAgent.name}
    />
  ) : (
    <></>
  );
}

function renderMapAsset(x: number, y: number, positions: MapAssetPositions) {
  const foundMapAsset = positions.find(
    (agent) => agent.x === x && agent.y === y
  );
  return foundMapAsset ? <MapAsset sprite={foundMapAsset.sprite} /> : <></>;
}
