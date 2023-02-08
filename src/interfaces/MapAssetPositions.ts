import { MapAssetSprite } from "../enum";

export type MapAssetPosition = {
  x: number;
  y: number;
  sprite: MapAssetSprite;
};
export type MapAssetPositions = Array<MapAssetPosition>;