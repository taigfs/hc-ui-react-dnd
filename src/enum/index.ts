import box from '../assets/images/box.png';
import man from '../assets/images/man.png';
import woman from '../assets/images/woman.png';
import house from '../assets/images/house.png';

export const ItemTypes = {
  AGENT: 'agent',
  AGENT_BUTTON: 'agent_button'
}

export const cellSize = 60; // px
export const boardSize = 11; // number of cells in a line

export const AgentSprite = {
  BOX: box,
  MAN: man,
  WOMAN: woman,
  HOUSE: house,
}

export enum MapAssetSprite {
  BLUE_LAND = `blue_land`,
  BROWN_LAND = `brown_land`,
  GREEN_LAND = `green_land`,
  YELLOW_LAND = `yellow_land`,
}