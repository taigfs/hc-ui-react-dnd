import { AgentInstance } from "./AgentInstance";

export interface Story {
  id?: number;
  name?: string;
  lastUpdate?: string;
  creating?: boolean;
  createdAt: string;
  scene: {
    name: string;
    nodes: BackendNode[];
    edges: BackendEdge[];
  };
  projectId?: number;
  agents?: AgentInstance[];
}
