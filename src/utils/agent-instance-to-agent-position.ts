import { AgentInstance } from "../interfaces/AgentInstance";
import { AgentPosition } from "../interfaces/AgentPositions";

export function agentInstanceToAgentPosition(
  agentInstances: AgentInstance[] = []
): AgentPosition[] {
  const validAgentInstances = agentInstances.filter(
    (instance) => instance.data?.x !== undefined && instance.data?.y !== undefined
  );
  return validAgentInstances.map((instance) => {
    return {
      x: instance.data.x,
      y: instance.data.y,
      sprite: instance.agentSpriteId.toString(),
      name: instance.data.name,
      id: instance.id.toString(),
    };
  });
}
