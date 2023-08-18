import { AgentInstance } from "./AgentInstance";
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
  edges?: never; // Edges are only accessible through nodes
}
