import { MapAssetInstance } from "../interfaces/MapAssetInstance";
import { MapAssetPosition } from "../interfaces/MapAssetPositions";

export function mapAssetInstanceToMapAssetPosition(
  mapAssetInstances: MapAssetInstance[] = []
): MapAssetPosition[] {
  return mapAssetInstances.map((instance) => ({
    x: instance.data.x,
    y: instance.data.y,
    sprite: instance.mapAssetSpriteId.toString(),
  }));
}
