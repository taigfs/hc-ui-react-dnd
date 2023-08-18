import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { StoryService } from '../services/story.service';
import { StoryDto } from '../types/StoryDto';
import { AgentSpriteService } from '../services/agent-sprite.service';
import { CreateAgentInstanceDTO } from '../dtos/create-agent-instance-dto';
import { AgentInstanceService } from '../services/agent-instance.service';
import { PatchAgentInstanceDTO } from '../dtos/patch-agent-instance-dto';
import { PostNodeDTO } from '../dtos/post-node-dto';
import { PatchNodeDTO } from '../dtos/patch-node-dto';
import { PostEdgeDTO } from '../dtos/post-edge-dto';
import { PatchEdgeDTO } from '../dtos/patch-edge-dto';
import { useContext } from 'react';
import { SocketContext } from '../providers/socket-provider';

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
  return useQuery(['story', storyId], async () => StoryService.getStory(storyId), {
    staleTime: Infinity,
    refetchInterval: Infinity,
  });
}

export function useAgentInstance() {
  return {
    post: useMutation((agentInstanceData: CreateAgentInstanceDTO) => AgentInstanceService.postAgentInstance(agentInstanceData)),
    patch: useMutation((agentInstanceData: PatchAgentInstanceDTO) => AgentInstanceService.patchAgentInstance(agentInstanceData))
  };
}

export function useNodeAndEdgeInstance() {
  const socket = useContext(SocketContext);

  const postNode = (nodeInstanceData: PostNodeDTO) => socket?.emit('createNode', nodeInstanceData);
  const patchNode = (nodeInstanceData: PatchNodeDTO) => socket?.emit('updateNode', nodeInstanceData);
  const postEdge = (edgeInstanceData: PostEdgeDTO) => socket?.emit('createEdge', edgeInstanceData);
  const patchEdge = (edgeInstanceData: PatchEdgeDTO) => socket?.emit('updateEdge', edgeInstanceData);
  
  return {
    postNode,
    patchNode,
    postEdge,
    patchEdge
  };
}
