export const mapAssets = [
  3, 4, 6, 8, 9, 131, 251, 252, 308, 309, 315, 317, 318, 336, 531, 770,
];

export const mapAssetIds = {
  '3': 1,
  '4': 2,
  '6': 3,
  '8': 4,
  '9': 5,
  '131': 6,
  '251': 7,
  '252': 8,
  '308': 9,
  '309': 10,
  '315': 11,
  '317': 12,
  '318': 13,
  '336': 14,
  '531': 15,
  '770': 16,
}

export function getMapAssetSpritePath(sprite: string) {
  return `https://hookcaptain.s3.sa-east-1.amazonaws.com/images/map-assets/${sprite}.gif`;
}
