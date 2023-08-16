export interface CreateAgentInstanceDTO {
  id?: number;
  data: {
    x: number;
    y: number;
    name: string;
  };
  agentSprite: {
    connect: {
      id: number;
    };
  };
  story: {
    connect: {
      id: number;
    };
  };
}
