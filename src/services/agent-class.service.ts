import { CreateAgentClassDTO } from "../dtos/create-agent-class-dto";
import { UpdateAgentClassDTO } from "../dtos/update-agent-class-dto";
import { AgentClass } from "../types/agent-class.type";
import axiosInstance from "./api";

export abstract class AgentClassService {

  static async getAgentClasses(projectId: number) {
    const response = await axiosInstance.get<AgentClass[]>(`/agent-class`, { params: { projectId } });
    return response.data;
  }

  static async postAgentClass(agentClassData: CreateAgentClassDTO) {
    const response = await axiosInstance.post('/agent-class', agentClassData);
    return response.data;
  }

  static async patchAgentClass(agentClassData: UpdateAgentClassDTO) {
    const response = await axiosInstance.patch(`/agent-class/${agentClassData.id}`, agentClassData.updates);
    return response.data;
  }
}
  