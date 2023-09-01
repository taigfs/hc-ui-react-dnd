export interface PatchAgentInstanceDTO {
  id: number;
  updates: {
    data: {
      x: number;
      y: number;
      name: string;
    };
    agentSpriteId: number;
    agentClassId: number;
  }
}
