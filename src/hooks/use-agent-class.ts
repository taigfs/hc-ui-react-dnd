import { useQuery, useMutation } from "react-query";
import { AgentClassService } from "../services/agent-class.service";

export function useAgentClass(projectId: number) {
  return {
    agentClasses: useQuery(['agentClasses', projectId], async () => AgentClassService.getAgentClasses(projectId), {
      enabled: false
    }),
    patch: useMutation((agentClassData: UpdateAgentClassDTO) => AgentClassService.patchAgentClass(agentClassData))
  };
}
