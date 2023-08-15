import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { StoryService } from '../services/story.service';
import { StoryDto } from '../types/StoryDto';
import { AgentSpriteService } from '../services/agent-sprite.service';
import { CreateAgentInstanceDTO } from '../dtos/create-agent-instance-dto';
import { AgentInstanceService } from '../services/agent-instance.service';
import { PatchAgentInstanceDTO } from '../dtos/patch-agent-instance-dto';

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

export function useAgentInstance() {
  return {
    post: useMutation((agentInstanceData: CreateAgentInstanceDTO) => AgentInstanceService.postAgentInstance(agentInstanceData)),
    patch: useMutation((agentInstanceData: PatchAgentInstanceDTO) => AgentInstanceService.patchAgentInstance(agentInstanceData))
  };
}
