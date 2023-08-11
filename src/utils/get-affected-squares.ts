import { MapAssetPosition } from "../interfaces/MapAssetPositions";

export function getAffectedSquares(
  x: number,
  y: number,
  sprite: string,
  range: number
): MapAssetPosition[] {
  const affectedBlocks: MapAssetPosition[] = [];

  for (let i = -range; i <= range; i++) {
    for (let j = -range; j <= range; j++) {
      affectedBlocks.push({ x: x + i, y: y + j, sprite });
    }
  }

  return affectedBlocks;
}
