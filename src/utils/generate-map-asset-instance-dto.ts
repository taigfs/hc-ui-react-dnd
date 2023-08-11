import { MapAssetInstanceDTO } from '../dtos/map-asset-instance-dto';

export function generateMapAssetInstanceDTO(x: number, y: number, activeMapAssetButton: string, currentSceneId: number = 0): MapAssetInstanceDTO {
  const mapAssetInstanceData: MapAssetInstanceDTO = {
    data: {
      x,
      y,
    },
    mapAssetSprite: {
      connect: {
        id: parseInt(activeMapAssetButton as any, 10),
      },
    },
    scene: {
      connect: {
        id: currentSceneId,
      },
    },
  };

  return mapAssetInstanceData;
}
