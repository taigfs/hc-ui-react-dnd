import axios from 'axios';

export async function getStories(projectId: number) {
  const response = await axios.get(`/story?projectId=${projectId}`);
  return response.data;
}

export async function postStory(storyData) {
  const response = await axios.post('/story', storyData);
  return response.data;
}
