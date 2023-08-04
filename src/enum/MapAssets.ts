export const mapAssets = [
  3, 4, 6, 8, 9, 131, 251, 252, 308, 309, 315, 317, 318, 336, 531, 770,
];

export function getMapAssetSpritePath(sprite: string) {
  return `https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/${sprite}.gif`;
}
