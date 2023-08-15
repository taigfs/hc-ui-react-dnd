import axiosInstance from '../services/api';
import { AgentInstanceDTO } from '../dtos/agent-instance-dto';

export abstract class AgentInstanceService {
  static async postAgentInstance(agentInstanceData: AgentInstanceDTO) {
    const response = await axiosInstance.post('/agent-instance', agentInstanceData);
    return response.data;
  }
}
