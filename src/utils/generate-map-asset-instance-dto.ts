import { MapAssetInstanceDTO } from '../dtos/patch-map-asset-instance-dto';
import { MapAssetPosition } from '../interfaces/MapAssetPositions';

export function generateMapAssetInstanceDTO(id: string, input: MapAssetPosition[]): MapAssetInstanceDTO {
  return {
    id,
    updates: {
      data: input.map((item) => ({
        data: {
          x: item.x,
          y: item.y,
        },
        mapAssetSpriteId: item.sprite,
      }))
    }
  }
}
