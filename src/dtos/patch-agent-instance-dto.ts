export interface PatchAgentInstanceDTO {
  id: string;
  updates: {
    data: {
      x: number;
      y: number;
      name: string;
    };
    agentSpriteId: string;
    agentClassId: string;
    values?: any;
  }
}
