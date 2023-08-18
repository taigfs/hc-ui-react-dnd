import { AgentInstance } from "./AgentInstance";
import { EdgeInstance } from "./EdgeInstance";
import { NodeInstance } from "./NodeInstance";

export interface Story {
  id?: number;
  name?: string;
  lastUpdate?: string;
  creating?: boolean;
  createdAt: string;
  projectId?: number;
  nodes: NodeInstance[];
  agents?: AgentInstance[];
}
