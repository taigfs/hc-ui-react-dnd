export const mapAssets = [
  3, 4, 6, 8, 9, 131, 251, 252, 308, 309, 315, 317, 318, 336, 531, 770,
];

export function getMapAssetSpritePath(sprite: string) {
  return import.meta.env.PROD
    ? `images/map-assets/${sprite}.gif`
    : `src/assets/images/map-assets/${sprite}.gif`;
}
