import Agent from "./Agent";
import BoardSquare from "./BoardSquare";
import { boardSize } from "../enum";
import { AgentPositions } from "../interfaces/AgentPositions";

export function renderSquare(i: number, agentPositions: AgentPositions) {
  const x = i % boardSize;
  const y = Math.floor(i / boardSize);
  return (
    <BoardSquare x={x} y={y} key={i}>
      {renderPiece(x, y, agentPositions)}
    </BoardSquare>
  );
}

function renderPiece(x: number, y: number, agentPositions: AgentPositions) {
  for (let i = 0; i<agentPositions.length; i++) {
    if (x === agentPositions[i][0] && y === agentPositions[i][1]) {
      return <Agent agentIndex={i} />
    }
  }
  return <></>;
}