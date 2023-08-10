export interface MapAssetInstance {
  id: number;
  data: {
    x: number;
    y: number;
  };
  sceneId: number;
  createdAt: string;
  mapAssetSprite: {
    name: string;
  }
}
