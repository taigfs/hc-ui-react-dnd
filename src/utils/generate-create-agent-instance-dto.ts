export function generateCreateAgentInstanceDTO(x: number, y: number, sprite: string, name: string, currentStoryId: number = 0) {
  const agentInstanceData = {
    data: {
      x,
      y,
      name,
    },
    agentSpriteId: parseInt(sprite, 10),
    storyId: currentStoryId,
  };

  return agentInstanceData;
}
