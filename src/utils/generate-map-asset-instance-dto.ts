import { MapAssetPosition } from '../interfaces/MapAssetPositions';

export function generateMapAssetInstanceDTO(id: string, input: MapAssetPosition[]) {
  return input.map((item) => ({
    data: {
      x: item.x,
      y: item.y,
    },
    mapAssetSpriteId: item.sprite,
  }));
}
