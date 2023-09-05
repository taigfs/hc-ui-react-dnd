import { useQuery, useMutation, useQueryClient } from "react-query";
import { AgentClassService } from "../services/agent-class.service";
import { UpdateAgentClassDTO } from "../dtos/update-agent-class-dto";

export function useAgentClass(projectId: number) {
  const queryClient = useQueryClient();
  return {
    agentClasses: useQuery(['agentClasses', projectId], async () => AgentClassService.getAgentClasses(projectId), {
      enabled: false
    }),
    patch: useMutation((agentClassData: UpdateAgentClassDTO) => {
      return AgentClassService.patchAgentClass(agentClassData).then(() => {
        queryClient.invalidateQueries(['agentClasses', projectId]);
      });
    })
  };
}
