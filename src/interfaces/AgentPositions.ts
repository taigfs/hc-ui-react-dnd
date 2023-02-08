import { AgentSprite } from "../enum";

export type AgentPosition = {
  x: number;
  y: number;
  sprite: AgentSprite;
};
export type AgentPositions = Array<AgentPosition>;