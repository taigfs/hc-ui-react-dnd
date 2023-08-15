import { AgentInstance } from "./AgentInstance";

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
  agents?: AgentInstance[];
}
