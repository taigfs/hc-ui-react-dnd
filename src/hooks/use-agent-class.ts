import { useQuery } from "react-query";
import { AgentClassService } from "../services/agent-class.service";

export function useAgentClass(projectId: number) {
  return {
    get: useQuery(['agentClasses', projectId], async () => AgentClassService.getAgentClasses(projectId))
  };
}