import { AgentInstance } from "../interfaces/AgentInstance";

export function generatePatchAgentInstanceDTO(agent: AgentInstance, x: number, y: number): AgentInstance {
  return {
    ...agent,
    data: {
      ...agent.data,
      x,
      y
    }
  };
}
