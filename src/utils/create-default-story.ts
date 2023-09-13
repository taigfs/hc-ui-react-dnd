async function createDefaultStory(projectId: string) {
  return await this.prisma.client.story.create({
    data: {
      name: 'First Story',
      projectId,
    },
  });
}
export { createDefaultStory };
