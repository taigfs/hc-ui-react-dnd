import { PostNodeDTO } from "../dtos/post-node-dto";

export function generatePatchNodeDTO(id: number, updates: Partial<PostNodeDTO>): PatchNodeDTO {
  return {
    id,
    updates: {
      ...updates,
      x: Math.round(updates.x || 0),
      y: Math.round(updates.y || 0),
    }
  };
}
