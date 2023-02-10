import * as assetImports from '../assets/images/map-assets/';
import mapAsset3 from '../assets/images/map-assets/3.gif';

export const mapAssets = [3, 4, 6, 8, 9, 131, 251, 252, 308, 309, 315, 317, 318, 336, 531, 770];

// const assetImports = mapAssets.reduce((acc: any, asset: any) => {
//   acc[asset] = require(`../assets/images/map-assets/${asset}.gif`);
//   return acc;
// }, {});


// export const MapAssetSprites = mapAssets.reduce<Record<string, typeof import("/Users/taigfs/HC/hc-ui-react-dnd/src/assets/images/map-assets/index")>>((acc, cur) => {
//   acc[cur] = assetImports[cur];
//   return acc;
// }, {});

export function getMapAssetSpritePath(sprite: string) {
  return `src/assets/images/map-assets/${sprite}.gif`;
}

interface MapAssetSpritesProps {
  [key: string]: string;
}

export const MapAssetSprites: MapAssetSpritesProps = {
  mapAsset3,
};