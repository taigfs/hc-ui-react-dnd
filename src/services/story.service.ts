import { Story } from '../interfaces/Story';
import axiosInstance from '../services/api';
import { StoryDto } from '../types/StoryDto';

export abstract class StoryService {

  static async getStories(projectId: number) {
    const response = await axiosInstance.get<Story[]>(`/story?projectId=${projectId}`);
    return response.data;
  }
  
  static async postStory(storyData: StoryDto) {
    const response = await axiosInstance.post('/story', storyData);
    return response.data;
  }

  static async getStory(storyId: number) {
    const response = await axiosInstance.get<Story>(`/story/${storyId}`);
    return response.data;
  }
}
