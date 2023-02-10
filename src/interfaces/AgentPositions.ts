import { AgentSprite } from "../enum";

export type AgentPosition = {
  x: number;
  y: number;
  sprite: string;
  name?: string;
};
export type AgentPositions = Array<AgentPosition>;