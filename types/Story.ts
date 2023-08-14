export interface Story {
  id: number;
  name: string;
  createdAt: string;
  projectId: number;
  nodes: Node[];
  agents: AgentInstance[];
}
