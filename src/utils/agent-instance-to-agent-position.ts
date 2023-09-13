import { AgentInstance } from "../interfaces/AgentInstance";
import { AgentPosition } from "../interfaces/AgentPositions";

export function agentInstancesToAgentPositions(
  agentInstances: AgentInstance[] = []
): AgentPosition[] {
  const validAgentInstances = agentInstances.filter(
    (instance) => instance.data?.x !== undefined && instance.data?.y !== undefined
  );
  return validAgentInstances.map((instance) => {
    return agentInstanceToAgentPosition(instance);
  });
}

export function agentInstanceToAgentPosition (agentInstance: AgentInstance): AgentPosition {
  if (!agentInstance.id) { throw new Error('agentInstanceToAgentPosition: agentInstance.id is undefined'); }
  return {
    x: agentInstance.data.x,
    y: agentInstance.data.y,
    sprite: agentInstance.agentSpriteId,
    name: agentInstance.data.name,
    id: agentInstance.id,
  }
} 
