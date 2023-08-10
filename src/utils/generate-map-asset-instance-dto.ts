import { MapAssetInstanceDTO } from '../dtos/map-asset-instance-dto';

export function generateMapAssetInstanceDTO(x: number, y: number, activeMapAssetButton: string): MapAssetInstanceDTO {
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
        id: 1, // Replace with the actual scene ID
      },
    },
  };

  return mapAssetInstanceData;
}
