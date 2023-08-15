import axiosInstance from '../services/api';
import { CreateAgentInstanceDTO } from '../dtos/create-agent-instance-dto';
import { PatchAgentInstanceDTO } from '../dtos/patch-agent-instance-dto';

export abstract class AgentInstanceService {
  static async postAgentInstance(agentInstanceData: CreateAgentInstanceDTO) {
    const response = await axiosInstance.post('/agent-instance', agentInstanceData);
    return response.data;
  }

  static async patchAgentInstance(agentInstanceData: PatchAgentInstanceDTO) {
    const response = await axiosInstance.patch(`/agent-instance/${agentInstanceData.id}`, agentInstanceData.updates);
    return response.data;
  }
}
