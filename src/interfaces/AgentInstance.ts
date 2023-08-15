export interface AgentInstance {
  id: number;
  agentSpriteId: number;
  data: {
    x: number;
    y: number;
    name: string;
  };
  storyId: number;
}
