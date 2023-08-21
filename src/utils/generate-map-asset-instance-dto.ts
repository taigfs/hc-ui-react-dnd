import { MapAssetInstanceDTO } from '../dtos/patch-map-asset-instance-dto';
import { MapAssetPosition } from '../interfaces/MapAssetPositions';

export function generateMapAssetInstanceDTO(id: number, input: MapAssetPosition[]): MapAssetInstanceDTO {
  return {
    id,
    updates: {
      data: input.map((item) => ({
        data: {
          x: item.x,
          y: item.y,
        },
        mapAssetSpriteId: parseInt(item.sprite, 10),
      }))
    }
  }
}
