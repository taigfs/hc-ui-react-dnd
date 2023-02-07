import Knight from "./Knight";
import styled from 'styled-components';
import { useGameStore } from "../state/store";
import BoardSquare from "./BoardSquare";

interface SquareProps {
  children: React.ReactNode
}

export function renderSquare(i: number, knightPosition: [number, number]) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const black = (x + y) % 2 === 1

  const setKnightPosition = useGameStore((state) => state.setKnightPosition);
  const handleSquareClick = () => {
    setKnightPosition(x, y);
  }

  return (
    <BoardSquare x={x} y={y} black={black}>
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