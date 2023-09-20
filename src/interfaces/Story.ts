import { AgentInstance } from "./AgentInstance";
import { NodeInstance } from "./NodeInstance";

export interface Story {
  id?: string;
  name?: string;
  lastUpdate?: string;
  creating?: boolean;
  createdAt?: string;
  projectId?: string;
  nodes?: NodeInstance[];
  agents?: AgentInstance[];
  edges?: never; // Edges are only accessible through nodes
  nodesExecutionSequence?: NodeInstance[];
}
