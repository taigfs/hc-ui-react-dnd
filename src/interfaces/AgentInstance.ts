export interface AgentInstance {
  id: number;
  agentSpriteId: number;
  agentClassId: number;
  data: {
    x: number;
    y: number;
    name: string;
    tempId?: string;
  };
  storyId: number;
  values: {
    [key: string]: any;
  }
}
