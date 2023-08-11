export interface MapAssetInstanceDTO {
  data: {
    x: number;
    y: number;
  };
  mapAssetSprite: {
    connect: {
      id: number;
    };
  };
  scene: {
    connect: {
      id: number;
    };
  };
}