export interface AgentInstance {
  id?: string;
  agentSpriteId: string;
  agentClassId?: string;
  data: {
    x: number;
    y: number;
    name: string;
    tempId?: string;
  };
  storyId: string;
  values?: {
    [key: string]: any;
  }
}
