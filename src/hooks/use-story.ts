import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { StoryService } from '../services/story.service';
import { StoryDto } from '../types/StoryDto';

export function useGetStories(projectId: number) {
  return useQuery('stories', async () => StoryService.getStories(projectId));
}

export function usePostStory() {
  return useMutation((storyData: StoryDto) => StoryService.postStory(storyData));
}
