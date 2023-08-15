import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { StoryService } from '../services/story.service';
import { StoryDto } from '../types/StoryDto';
import { AgentSpriteService } from '../services/agent-sprite.service';
import { AgentInstanceDTO } from '../dtos/agent-instance-dto';
import { AgentInstanceService } from '../services/agent-instance.service';

export function useGetStories(projectId: number) {
  return useQuery('stories', async () => StoryService.getStories(projectId));
}

export function usePostStory() {
  const queryClient = useQueryClient();
  return useMutation((storyData: StoryDto) => StoryService.postStory(storyData), {
    onSuccess: () => {
      queryClient.invalidateQueries('stories');
    }
  });
}

export function useGetAgentSprites() {
  return useQuery('agentSprites', async () => AgentSpriteService.getAgentSprites());
}

export function useGetStory(storyId: number) {
  return useQuery(['story', storyId], async () => StoryService.getStory(storyId));
}

export function usePostAgentInstance() {
  return useMutation((agentInstanceData: AgentInstanceDTO) => AgentInstanceService.postAgentInstance(agentInstanceData));
}
