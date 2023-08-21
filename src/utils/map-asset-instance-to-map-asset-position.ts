import { MapAssetInstance } from "../interfaces/MapAssetInstance";
import { MapAssetPosition } from "../interfaces/MapAssetPositions";

export function mapAssetInstanceToMapAssetPosition(
  mapAssetInstances: MapAssetInstance[] = []
): MapAssetPosition[] {
  const validMapAssetInstances = mapAssetInstances.filter(
    (instance) => instance.data?.x !== undefined && instance.data?.y !== undefined
  );
  return validMapAssetInstances.map((instance) => {
    return {
      x: instance.data.x,
      y: instance.data.y,
      sprite: instance.mapAssetSpriteId+``
    };
  });
}
