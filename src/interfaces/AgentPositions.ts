import { AgentSprite } from "../enum";

export type AgentPosition = {
  x: number;
  y: number;
  sprite: string;
};
export type AgentPositions = Array<AgentPosition>;