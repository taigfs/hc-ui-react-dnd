export interface Story {
  id?: number;
  name?: string;
  lastUpdate?: string;
  creating?: boolean;
  createdAt: string;
  scene: {
    name: string;
  };
  projectId?: number;
  agents?: {
    id: number;
    agentSpriteId: number;
    data: {
      x: number;
      y: number;
      name: string;
    };
    storyId: number;
    createdAt: string;
  }[];
}
