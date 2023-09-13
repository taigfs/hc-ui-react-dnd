async function createDefaultScene(projectId: string) {
  return await this.create({
    name: 'First Scene',
    projectId,
  });
}
export { createDefaultScene };
