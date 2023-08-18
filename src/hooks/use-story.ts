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

export function useNodeAndEdgeInstance() {
  const queryClient = useQueryClient();

  const postNode = useMutation((nodeData: PostNodeDTO) => {
    // Call the backend API to create a new node
    return axios.post('/api/nodes', nodeData);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('nodes');
    }
  });

  const patchNode = useMutation((nodeId: string, nodeData: PatchNodeDTO) => {
    // Call the backend API to update an existing node
    return axios.patch(`/api/nodes/${nodeId}`, nodeData);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('nodes');
    }
  });

  const postEdge = useMutation((edgeData: PostEdgeDTO) => {
    // Call the backend API to create a new edge
    return axios.post('/api/edges', edgeData);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('edges');
    }
  });

  const patchEdge = useMutation((edgeId: string, edgeData: PatchEdgeDTO) => {
    // Call the backend API to update an existing edge
    return axios.patch(`/api/edges/${edgeId}`, edgeData);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('edges');
    }
  });

  return {
    postNode,
    patchNode,
    postEdge,
    patchEdge
  };
}
