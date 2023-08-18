export function generatePatchNodeDTO(id: number, updates: Partial<PostNodeDTO>): PatchNodeDTO {
  return {
    id,
    updates
  };
}
