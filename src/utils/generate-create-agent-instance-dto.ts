export function generateCreateAgentInstanceDTO(x: number, y: number, sprite: string, name: string, currentStoryId: number = 0, tempId: string = "") {
  const agentInstanceData = {
    data: {
      x,
      y,
      name,
      tempId,
    },
    agentSpriteId: parseInt(sprite, 10),
    storyId: currentStoryId,
  };

  return agentInstanceData;
}
