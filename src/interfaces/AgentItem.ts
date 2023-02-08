import { AgentSprite } from "../enum";

export interface AgentItemProps {
  type: string;
  agentIndex: number;
  sprite: AgentSprite;
}

export interface AgentButtonItemProps {
  type: string;
  sprite: AgentSprite;
}