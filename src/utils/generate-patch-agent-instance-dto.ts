import { PatchAgentInstanceDTO } from "../dtos/patch-agent-instance-dto";

export function generatePatchAgentInstanceDTO(x: number, y: number, sprite: string, name: string, id: number): PatchAgentInstanceDTO {
  return {
    id,
    updates: {
      data: {
        x,
        y,
        name,
      },
      agentSpriteId: parseInt(sprite, 10),
    }
  };
}
