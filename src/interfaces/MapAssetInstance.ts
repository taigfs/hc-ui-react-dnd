export interface MapAssetInstance {
  id: number;
  mapAssetSpriteId: number;
  data: {
    x: number;
    y: number;
  };
  sceneId: number;
  createdAt: string;
}
