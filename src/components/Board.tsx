import styled from "styled-components";
import { renderSquare } from "./Square";
import { boardSize } from "../enum";
import { AgentPositions } from "../interfaces/AgentPositions";
import { MapAssetPositions } from "../interfaces/MapAssetPositions";
import { useBoardStore } from "../state/store";

interface BoardProps {
}

export default function Board ({}: BoardProps) {

  const { agentPositions, mapAssetPositions } = useBoardStore((state) => state);
  const numberOfCells = Math.pow(boardSize, 2);
  const squares = []
  for (let i = 0; i < numberOfCells; i++) {
    squares.push(renderSquare(i, agentPositions, mapAssetPositions))
  }

  return (
    <Container>
      {squares}
    </Container>
  );
}

export function canMoveAgent(x: number, y: number, agentPositions: AgentPositions) {
  return !agentPositions.some(({ x: px, y: py }) => px === x && py === y);
}

const Container = styled.div`
  width: ${({ theme }) => theme.boardSize};
  height: ${({ theme }) => theme.boardSize};
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;