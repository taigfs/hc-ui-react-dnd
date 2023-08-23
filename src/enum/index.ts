export const ItemTypes = {
  AGENT: "agent",
  AGENT_BUTTON: "agent_button",
};

export const cellSize = 63; // px
export const boardSize = 10; // number of cells in a line
export const boardDimensions: [number, number] = [
  cellSize * boardSize,
  cellSize * boardSize,
];

export const AGENT_SPEED = 400;

export enum MapAssetSprite {
  BLUE_LAND = `blue_land`,
  BROWN_LAND = `brown_land`,
  GREEN_LAND = `green_land`,
  YELLOW_LAND = `yellow_land`,
}
