export interface MapAssetInstanceDTO {
  id: number;
  updates: {
    data: {
      data: {
        x: number;
        y: number;
      };
      mapAssetSpriteId: number;
    }[]
  }
}