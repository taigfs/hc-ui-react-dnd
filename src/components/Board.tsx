import styled from "styled-components";

import { renderSquare } from "./Square";
import { boardSize } from "../enum";
import { AgentPositions } from "../interfaces/AgentPositions";
import { useBoardStore } from "../state/BoardStore";

interface BoardProps {
  hidden: boolean;
}

export default function Board({ hidden }: BoardProps) {
  const { agentPositions, mapAssetPositions } = useBoardStore((state) => state);
  const numberOfCells = Math.pow(boardSize, 2);
  const squares = [];
  for (let i = 0; i < numberOfCells; i++) {
    squares.push(renderSquare(i, agentPositions, mapAssetPositions));
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
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;
