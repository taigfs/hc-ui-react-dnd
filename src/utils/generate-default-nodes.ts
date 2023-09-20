export function generateDefaultNodes(storyId: string) {
  const startNode = {
    type: 'start-event',
    x: 200,
    y: 250,
    label: 'Start',
    storyId,
    data: {},
  };

  const endNode = {
    type: 'end-event',
    x: 800,
    y: 250,
    label: 'End',
    storyId,
    data: {}
  };

  return [startNode, endNode];
}