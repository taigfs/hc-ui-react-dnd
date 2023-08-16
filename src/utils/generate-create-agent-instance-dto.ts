export function generateCreateAgentInstanceDTO(x: number, y: number, sprite: string, name: string, currentStoryId: number = 0) {
  const agentInstanceData = {
    data: {
      x,
      y,
      name,
    },
    agentSprite: {
      connect: {
        id: parseInt(sprite, 10),
      },
    },
    story: {
      connect: {
        id: currentStoryId,
      },
    },
  };

  return agentInstanceData;
}
