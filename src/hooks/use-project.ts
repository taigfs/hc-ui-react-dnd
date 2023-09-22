import { ProjectService } from "../services/project.service";
import { useMutation, useQuery } from "react-query";
import { AgentSpriteService } from "../services/agent-sprite.service";
import { MapAssetSpriteService } from "../services/map-asset-sprite.service";
import { GeneratedSceneData } from "../types/generated-scene-data.type";

export function useProject(projectId: number) {
  return useQuery(['project', projectId], async () => ProjectService.getProject(projectId), {
    staleTime: 30,
    enabled: projectId !== 0
  });
}

export function useGetAgentSprites() {
  return useQuery('agentSprites', async () => AgentSpriteService.getAgentSprites(), {
    // donot refresh after first load
    staleTime: Infinity,
  });
}

export function useGetMapAssetSprites() {
  return useQuery('mapAssetSprites', async () => MapAssetSpriteService.getMapAssetSprites(), {
    // donot refresh after first load
    staleTime: Infinity
  });
}

export function useGenerateScene (callback: (data: GeneratedSceneData) => void) {
  return useMutation(MapAssetSpriteService.generateScene, {
    onSuccess: (data) => callback(data)
  });
}
