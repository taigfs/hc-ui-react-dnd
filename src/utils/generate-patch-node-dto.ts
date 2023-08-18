import { PostNodeDTO } from "../dtos/post-node-dto";

export function generatePatchNodeDTO(id: number, updates: Partial<PostNodeDTO>): PatchNodeDTO {
  return {
    id,
    updates: {
      ...updates,
      x: Math.floor(updates.x || 0),
      y: Math.floor(updates.y || 0),
    }
  };
}
