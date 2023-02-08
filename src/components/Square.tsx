import Knight from "./Knight";
import styled from 'styled-components';
import { useGameStore } from "../state/store";
import BoardSquare from "./BoardSquare";
import { boardSize } from "../enum";

interface SquareProps {
  children: React.ReactNode
}

export function renderSquare(i: number, knightPosition: [number, number]) {
  const x = i % boardSize;
  const y = Math.floor(i / boardSize);
  return (
    <BoardSquare x={x} y={y}>
      {renderPiece(x, y, knightPosition)}
    </BoardSquare>
  );
}

function renderPiece(x: number, y: number, [knightX, knightY]: [number, number]) {
  if (x === knightX && y === knightY) {
    return <Knight />
  }
  return <></>;
}