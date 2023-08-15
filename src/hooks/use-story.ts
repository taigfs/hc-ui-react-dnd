import { useMutation, useQueryClient } from 'react-query';
import { AgentInstanceDTO } from '../dtos/agent-instance-dto';
import { AgentInstanceService } from '../services/agent-instance.service';

export function usePostAgentInstance() {
  const queryClient = useQueryClient();
  return useMutation((agentInstanceData: AgentInstanceDTO) => AgentInstanceService.postAgentInstance(agentInstanceData), {
    onSuccess: () => {
      queryClient.invalidateQueries('agentInstances');
    }
  });
}
