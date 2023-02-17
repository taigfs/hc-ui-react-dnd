export const ItemTypes = {
  AGENT: 'agent',
  AGENT_BUTTON: 'agent_button'
}

export const cellSize = 60; // px
export const boardSize = 11; // number of cells in a line
export const boardDimensions: [number, number] = [60*11, 60*11];

export const AGENT_SPEED = 1000;

export enum MapAssetSprite {
  BLUE_LAND = `blue_land`,
  BROWN_LAND = `brown_land`,
  GREEN_LAND = `green_land`,
  YELLOW_LAND = `yellow_land`,
}