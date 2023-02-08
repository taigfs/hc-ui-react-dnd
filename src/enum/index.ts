export const ItemTypes = {
  AGENT: 'agent',
  AGENT_BUTTON: 'agent_button'
}

export const cellSize = 60; // px
export const boardSize = 11; // number of cells in a line

export enum AgentSprite {
  KNIGHT = `♘`,
  KING = `♔`,
  QUEEN =`♕`,
  TOWER = `♖`,
  BISHOP = `♗`,
  PAWN = `♙`,
}

export enum MapAssetSprite {
  BLUE_LAND = `blue_land`,
  BROWN_LAND = `brown_land`,
  GREEN_LAND = `green_land`,
  YELLOW_LAND = `yellow_land`,
}