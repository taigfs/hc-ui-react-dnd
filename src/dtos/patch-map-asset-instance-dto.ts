export interface MapAssetInstanceDTO {
  id: string;
  updates: {
    data: {
      data: {
        x: number;
        y: number;
      };
      mapAssetSpriteId: string;
    }[]
  }
}