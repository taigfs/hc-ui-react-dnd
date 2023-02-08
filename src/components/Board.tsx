import styled from "styled-components";
import { renderSquare } from "./Square";
import { boardSize } from "../enum";
import { AgentPositions } from "../interfaces/AgentPositions";

interface BoardProps {
  agentPositions: AgentPositions;
}

export default function Board ({ agentPositions }: BoardProps) {

  const numberOfCells = Math.pow(boardSize, 2);
  const squares = []
  for (let i = 0; i < numberOfCells; i++) {
    squares.push(renderSquare(i, agentPositions))
  }

  return (
    <Container>
      {squares}
    </Container>
  );
}

export function canMoveAgent(x: number, y: number, agentPositions: AgentPositions) {
  for (let i = 0; i<agentPositions.length; i++) {
    if (agentPositions[i].x === x && agentPositions[i].y === y) { return false; }
  }
  return true;
}

const Container = styled.div`
  width: ${({ theme }) => theme.boardSize};
  height: ${({ theme }) => theme.boardSize};
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${({ theme }) => theme.color.squareBorder};
`;