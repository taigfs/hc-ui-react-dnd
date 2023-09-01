import { useQuery, useMutation, useQueryClient, UseQueryOptions } from 'react-query';
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
import { generatePatchNodeDTO } from '../utils/generate-patch-node-dto';
import { useAgentClass } from './use-agent-class';

export function useGetStories(projectId: number) {
  return useQuery('stories', async () => StoryService.getStories(projectId));
}

export function useStoryExecution(storyId: number) {
  const socket = useContext(SocketContext);
  const postExecuteStory = () => socket?.emit('executeStory', {id: storyId});
  return {
    postExecuteStory,
  }
}

export function usePostStory() {
  const queryClient = useQueryClient();
  return useMutation((storyData: StoryDto) => StoryService.postStory(storyData), {
    onSuccess: () => {
      queryClient.invalidateQueries('stories');
      queryClient.invalidateQueries('project');
    }
  });
}

export function useGetAgentSprites() {
  return useQuery('agentSprites', async () => AgentSpriteService.getAgentSprites(), {
    // donot refresh after first load
    staleTime: Infinity,
  });
}

export function useGetStory(storyId: number, enabled: boolean = true) {
  return useQuery(['story', storyId], async () => StoryService.getStory(storyId), {
    staleTime: 30,
    enabled: enabled !== true ? enabled : storyId !== 0
  });
}

export function useAgentInstance(projectId: number) {
  const queryClient = useQueryClient();
  const { agentClasses } = useAgentClass(projectId);
  return {
    post: useMutation((agentInstanceData: CreateAgentInstanceDTO) => AgentInstanceService.postAgentInstance(agentInstanceData), {
      onSuccess: () => {
        // after 1 second refresh
        setTimeout(() => {
          agentClasses.refetch();
          queryClient.invalidateQueries('story');
        }, 1000);
      }
    }),
    patch: useMutation((agentInstanceData: PatchAgentInstanceDTO) => AgentInstanceService.patchAgentInstance(agentInstanceData))
  };
}

export function useNodeAndEdgeInstance() {
  const socket = useContext(SocketContext);

  const postNode = (nodeInstanceData: PostNodeDTO) => socket?.emit('createNode', nodeInstanceData);
  const patchNode = (nodeInstanceData: PatchNodeDTO) => socket?.emit('updateNode', generatePatchNodeDTO(nodeInstanceData.id, nodeInstanceData.updates));
  const postEdge = (edgeInstanceData: PostEdgeDTO) => socket?.emit('createEdge', edgeInstanceData);
  const patchEdge = (edgeInstanceData: PatchEdgeDTO) => socket?.emit('updateEdge', edgeInstanceData);
  const deleteNode = (nodeId: number) => socket?.emit('deleteNode', nodeId);
  const deleteEdge = (edgeId: number) => socket?.emit('deleteEdge', edgeId);
  
  return {
    postNode,
    patchNode,
    postEdge,
    patchEdge,
    deleteNode,
    deleteEdge,
  };
}
