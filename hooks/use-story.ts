import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

export function useGetStories(projectId: number) {
  return useQuery('stories', async () => {
    const response = await axios.get(`/story?projectId=${projectId}`);
    return response.data;
  });
}

export function usePostStory() {
  return useMutation((storyData) => {
    return axios.post('/story', storyData);
  });
}
