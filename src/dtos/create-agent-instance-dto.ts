export interface CreateAgentInstanceDTO {
  id?: number;
  data: {
    x: number;
    y: number;
    name: string;
  };
  agentSpriteId: number;
  storyId: number;
}
