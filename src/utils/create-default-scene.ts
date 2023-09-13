async function createDefaultScene(projectId: string) {
  return {
    name: 'First Scene',
    projectId,
  };
}
export { createDefaultScene };
